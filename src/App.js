import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home'; // Import Home component
import InventoryManagement from './InventoryManagement';
import CareScheduling from './CareScheduling';
import GrowthTracking from './GrowthTracking';
import Login from './Login';
import './App.css';

function App() {
  const [selectedTab, setSelectedTab] = useState('Home');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Inventory Management':
        return <InventoryManagement />;
      case 'Care Scheduling':
        return <CareScheduling />;
      case 'Growth Tracking':
        return <GrowthTracking />;
      default:
        return <Home />; // Default to Home page
    }
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Garden Grid</h1>
        </header>
        
        <nav className="tabs">

          <div className="search-bar">
            <label htmlFor="search">Search Bar:</label>
            <input type="text" id="search" />
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/care-scheduling" element={<CareScheduling />} />
            <Route path="/growth-tracking" element={<GrowthTracking />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        
        <footer>
          For technical support contact: <a href="mailto:222@garden.com">222@garden.com</a> or call 333-333-3333
        </footer>
      </div>
    </Router>
  );
}

export default App;
