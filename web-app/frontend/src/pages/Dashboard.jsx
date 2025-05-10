import React, { useEffect, useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/header.jsx';
import '../styles/Dashboard.css';

// dashboard component, fetches and displays the latest plant readings for the logged-in user.
function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [email, setEmail] = useState('');
  const [showLogs, setShowLogs] = useState(false);
  const [loading, setLoading] = useState(false);
  const logRef = useRef(null);

  // fetch readings when the component mounts and when the user token is available in local storage.
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    // decode token to get the email of the logged-in user.
    const fetchReadings = async () => {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);

        const res = await fetch(`http://localhost:5001/api/plants/${decoded.email}`);
        const data = await res.json();

        // check if the response is successful and set the readings state, if not, log the error message.
        if (data.success) {
          setReadings(data.readings);
        } else {
          console.error('Fetch error:', data.message);
        }
      } catch (err) {
        console.error('Error decoding token or fetching data:', err);
      }
    };

    // call the fetchReadings function to get the readings from the server.
    fetchReadings();
  }, []);

  // set the height of the log section based on whether it is shown or hidden.
  useEffect(() => {
    if (logRef.current) {
      if (showLogs) {
        logRef.current.style.height = `${logRef.current.scrollHeight}px`;
      } else {
        logRef.current.style.height = '0px';
      }
    }
  }, [showLogs]);
  
  // sort the readings by timestamp in descending order and get the latest reading,
  // the latest reading is displayed at the top of the logs.
  const sortedReadings = [...readings].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const latest = sortedReadings[0];

  // function to handle posting a new reading to the server.
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

      // check if the response is successful and parse the response data, 
      // if successful, alert the user and optionally refresh the readings.
      const data = await response.json();
      if (data.success) {
        alert('Reading posted successfully!');
        // Optionally refresh readings:
        setReadings((prev) => [data.reading, ...prev]);
      } else {
        alert(`Error: ${data.message}`);
      }
    // handle any errors that occur during the fetch request.
    } catch (error) {
      console.error('Error posting reading:', error);
      alert('Failed to post reading');
    } finally {
      setLoading(false);
    }
  };

  // if there are no readings, show a message indicating that there are no readings yet.
  // if there are readings, display the latest reading and a button to show/hide previous logs.
  return (
    <div>
      <Header />
      <h1 className="title-center">Dashboard</h1>

      {!latest && (
        <div className="card">
          <p>No readings yet. Try posting a reading below.</p>
        </div>
      )}

      {latest && (
        <div className="card">
          <h2>Current Reading</h2>
          <p><strong>Light:</strong> {latest.light}</p>
          <p><strong>Temp:</strong> {latest.temperature}°F</p>
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
              <p><strong>Temp:</strong> {log.temperature}°F</p>
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
          {loading ? 'Posting...' : 'Post Reading'}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
