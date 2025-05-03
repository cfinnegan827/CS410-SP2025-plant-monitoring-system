import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header.jsx';
import '../styles/Dashboard.css';

function Dashboard() {
  const [plants, setPlants] = useState(['Plant A', 'Plant B']);
  const [selectedPlant, setSelectedPlant] = useState('Plant A');
  const [readings, setReadings] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const logRef = useRef(null);

  //useEffect(() => {
    // if (!selectedPlant) return;
 
     //fetch(`http://<your-esp-ip>/api/readings?plant=${selectedPlant}`) // adjust endpoint
       //.then((res) => res.json())
       //.then((data) => {
         //setReadings(data);
         //setLatest(data[0]);
       //})
       //.catch((err) => console.error('Failed to fetch data:', err));
   //}, [selectedPlant]);
  
  
  // Mock data for demonstration
  useEffect(() => {
    const mockPlantA = [
      {
        light: 700,
        temp: 23.5,
        moisture: 40,
        humidity: 60,
        timestamp: "2025-05-01T14:23:16Z"
      },
      {
        light: 650,
        temp: 22.8,
        moisture: 42,
        humidity: 58,
        timestamp: "2025-05-01T14:10:00Z"
      },
      {
        light: 600,
        temp: 24.1,
        moisture: 38,
        humidity: 61,
        timestamp: "2025-05-01T13:50:00Z"
      }
    ];
  
    const mockPlantB = [
      {
        light: 300,
        temp: 18.2,
        moisture: 55,
        humidity: 72,
        timestamp: "2025-05-01T15:00:00Z"
      },
      {
        light: 250,
        temp: 17.9,
        moisture: 58,
        humidity: 74,
        timestamp: "2025-05-01T14:40:00Z"
      },
      {
        light: 200,
        temp: 19.0,
        moisture: 60,
        humidity: 70,
        timestamp: "2025-05-01T14:20:00Z"
      }
    ];
  
    if (selectedPlant === 'Plant A') {
      setReadings(mockPlantA);
    } else if (selectedPlant === 'Plant B') {
      setReadings(mockPlantB);
    }
  }, [selectedPlant]);
  
  useEffect(() => {
    if (logRef.current) {
      if (showLogs) {
        logRef.current.style.height = `${logRef.current.scrollHeight}px`;
      } else {
        logRef.current.style.height = '0px';
      }
    }
  }, [showLogs]);

  const latest = readings[0];

  return (
    <div>
      <Header />
      <h1 className="title-center">Dashboard</h1>

      {/* Plant Selector */}
      <div className="plantSelector">
        <label htmlFor="plantSelect">Select Plant: </label>
        <select
          id="plantSelect"
          value={selectedPlant}
          onChange={(e) => setSelectedPlant(e.target.value)}
        >
          {plants.map((plant, idx) => (
            <option key={idx} value={plant}>{plant}</option>
          ))}
        </select>
      </div>

      {/* Current Reading */}
      {latest && (
        <div className="card">
          <h2>Current Reading</h2>
          <p><strong>Light:</strong> {latest.light}</p>
          <p><strong>Temp:</strong> {latest.temp}°C</p>
          <p><strong>Soil Moisture:</strong> {latest.moisture}%</p>
          <p><strong>Humidity:</strong> {latest.humidity}%</p>
          <p><em>{new Date(latest.timestamp).toLocaleString()}</em></p>
        </div>
      )}

      {/* Toggle Button */}
      <div className="logToggleWrapper">
        <button className="logToggleBtn" onClick={() => setShowLogs(!showLogs)}>
          {showLogs ? 'Hide Logs ▲' : 'Show Previous Logs ▼'}
        </button>
      </div>

      {/* Sliding Log Section */}
      <div className="logSectionWrapper" ref={logRef}>
        <div className="logSection">
          {readings.slice(1).map((log, idx) => (
            <div className="logEntry card" key={idx}>
              <p><strong>Light:</strong> {log.light}</p>
              <p><strong>Temp:</strong> {log.temp}°C</p>
              <p><strong>Soil Moisture:</strong> {log.moisture}%</p>
              <p><strong>Humidity:</strong> {log.humidity}%</p>
              <p><em>{new Date(log.timestamp).toLocaleString()}</em></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;