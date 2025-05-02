import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/header.jsx';
import '../styles/Dashboard.css';

function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    console.log(jwtDecode(token));
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setEmail(decoded.email);

      fetch(`http://localhost:5001/api/plants/${decoded.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setReadings(data.readings);
          } else {
            console.error('Fetch error:', data.message);
          }
        })
        .catch((err) => console.error('Error fetching readings:', err));
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, []);

  const handlePostReading = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          light: 700,
          temperature: 23.5,
          soilMoisture: 40,
          humidity: 60,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Reading posted successfully!');
        // Optionally refresh readings:
        setReadings((prev) => [data.reading, ...prev]);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error posting reading:', error);
      alert('Failed to post reading');
    }
  };

  return (
    <div>
      <Header />
      <h1 className="title-center">Dashboard</h1>

      <div className="dashboardBento">
        {readings.map((reading, index) => (
          <div className="bentoItem medium" key={index}>
            <p><strong>Light:</strong> {reading.light}</p>
            <p><strong>Temp:</strong> {reading.temperature}°C</p>
            <p><strong>Soil Moisture:</strong> {reading.soilMoisture}%</p>
            <p><strong>Humidity:</strong> {reading.humidity}%</p>
            <p><em>{new Date(reading.timestamp).toLocaleString()}</em></p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handlePostReading} className="dashboard-button">
          Post Sample Reading
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
