import React from 'react';
import dashboardImage from '../assets/dashboard.jpg';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="text-center dashboard-container">
      <h1 className="mb-4">Welcome to the Product Management System</h1>
      <img src={dashboardImage} alt="Dashboard" className="img-fluid mb-4" />
      <p className="lead mb-4">Manage your suppliers, customers, products, orders, order details, and inventory restocks efficiently.</p>
    </div>
  );
}

export default Dashboard;

