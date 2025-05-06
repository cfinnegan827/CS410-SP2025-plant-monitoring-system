import React, { useEffect, useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/header.jsx';
import '../styles/Dashboard.css';

function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [email, setEmail] = useState('');
  const [showLogs, setShowLogs] = useState(false);
  const [loading, setLoading] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    const fetchReadings = async () => {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);

        const res = await fetch(`http://localhost:5001/api/plants/${decoded.email}`);
        const data = await res.json();

        if (data.success) {
          setReadings(data.readings);
        } else {
          console.error('Fetch error:', data.message);
        }
      } catch (err) {
        console.error('Error decoding token or fetching data:', err);
      }
    };

    fetchReadings();
  }, []);

  useEffect(() => {
    if (logRef.current) {
      if (showLogs) {
        logRef.current.style.height = `${logRef.current.scrollHeight}px`;
      } else {
        logRef.current.style.height = '0px';
      }
    }
  }, [showLogs]);

  const sortedReadings = [...readings].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const latest = sortedReadings[0];

  const handlePostReading = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <h1 className="title-center">Dashboard</h1>

      {!latest && (
        <div className="card">
          <p>No readings yet. Try posting a sample reading below.</p>
        </div>
      )}

      {latest && (
        <div className="card">
          <h2>Current Reading</h2>
          <p><strong>Light:</strong> {latest.light}</p>
          <p><strong>Temp:</strong> {latest.temperature}°C</p>
          <p><strong>Soil Moisture:</strong> {latest.soilMoisture}%</p>
          <p><strong>Humidity:</strong> {latest.humidity}%</p>
          <p><em>{new Date(latest.timestamp).toLocaleString()}</em></p>
        </div>
      )}

      <div className="logToggleWrapper">
        <button className="logToggleBtn" onClick={() => setShowLogs(!showLogs)}>
          {showLogs ? 'Hide Logs ▲' : 'Show Previous Logs ▼'}
        </button>
      </div>

      <div className="logSectionWrapper" ref={logRef}>
        <div className="logSection">
          {readings.slice(1).map((log, idx) => (
            <div className="logEntry card" key={idx}>
              <p><strong>Light:</strong> {log.light}</p>
              <p><strong>Temp:</strong> {log.temperature}°C</p>
              <p><strong>Soil Moisture:</strong> {log.soilMoisture}%</p>
              <p><strong>Humidity:</strong> {log.humidity}%</p>
              <p><em>{new Date(log.timestamp).toLocaleString()}</em></p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handlePostReading}
          className="dashboard-button"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Sample Reading'}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
