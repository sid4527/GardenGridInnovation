import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryManagement from './InventoryManagement';
import CareScheduling from './CareScheduling';
import GrowthTracking from './GrowthTracking';
import Login from './Login';
import './App.css';

function App() {
  const [selectedTab, setSelectedTab] = useState('Inventory Management');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Inventory Management':
        return <InventoryManagement />;
      case 'Care Scheduling':
        return <CareScheduling />;
      case 'Growth Tracking':
        return <GrowthTracking />;
      default:
        return <InventoryManagement />;
    }
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Garden Grid</h1>
        </header>
        
        <nav className="tabs">
          <button class="nav-tab" onClick={() => setSelectedTab('Inventory Management')}>Inventory Management</button>
          <button class="nav-tab" onClick={() => setSelectedTab('Care Scheduling')}>Care Scheduling</button>
          <button class="nav-tab" onClick={() => setSelectedTab('Growth Tracking')}>Growth Tracking</button>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={renderContent()} />
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
