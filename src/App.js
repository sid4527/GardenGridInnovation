import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import Inventory from './Inventory';
import Resources from './Resources';
import Reports from './Reports';
import InventoryManagement from './InventoryManagement';
import CareScheduling from './CareScheduling';
import GrowthTracking from './GrowthTracking';
import Login from './Login';
import './App.css';

function App() {
  const [selectedTab, setSelectedTab] = useState('Home');

  // Function to check if the current path is one of the excluded pages
  const useHideHeaderAndSearch = () => {
    const location = useLocation();
    const excludedPaths = ['/care-scheduling', '/inventory-management', '/growth-tracking', '/login'];
    return excludedPaths.includes(location.pathname);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Inventory Management':
        return <InventoryManagement />;
      case 'Care Scheduling':
        return <CareScheduling />;
      case 'Growth Tracking':
        return <GrowthTracking />;
      default:
        return <Home />;
    }
  };

  const hideHeaderAndSearch = useHideHeaderAndSearch();

  return (
    <Router>
      <div className="app">
        {!hideHeaderAndSearch && (
          <header>
            <h1>Garden Grid</h1>
          </header>
        )}
        
        {!hideHeaderAndSearch && (
          <nav className="tabs">
            <Link to="/" className="nav-tab" onClick={() => setSelectedTab('Home')}>Home</Link>
            <Link to="/inventory" className="nav-tab" onClick={() => setSelectedTab('Inventory Management')}>Inventory</Link>
            <Link to="/inventory-management" className="nav-tab" onClick={() => setSelectedTab('Entries')}>Entries</Link>
            <Link to="/resources" className="nav-tab" onClick={() => setSelectedTab('Resources')}>Resources</Link>
            <Link to="/reports" className="nav-tab" onClick={() => setSelectedTab('Reports')}>Reports</Link>

            <div className="search-bar">
              <label htmlFor="search">Search Bar:</label>
              <input type="text" id="search" />
            </div>
          </nav>
        )}
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory-management" element={<InventoryManagement />} />
            <Route path="/resources" element={<Resources />} /> 
            <Route path="/reports" element={<Reports />} /> 
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
