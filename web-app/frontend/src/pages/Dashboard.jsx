import React from 'react';
import Header from '../components/header.jsx';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div>
        <Header />
        <h1 className="title-center">Dashboard</h1>
        <div className="dashboardBento">
            <div className="bentoItem large">Large Item</div>
            <div className="bentoItem medium">Medium Item</div>
            <div className="bentoItem small">Small Item</div>
            <div className="bentoItem medium">Medium Item</div>
            <div className="bentoItem large">Large Item</div>
        </div>
    </div>
  );
}

export default Dashboard;
