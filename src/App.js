// src/App.js

import React, { useState } from 'react';
import InventoryManagement from './InventoryManagement';
import CareScheduling from './CareScheduling';
import GrowthTracking from './GrowthTracking';
import './App.css';
import Login from './Login';

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
    <div className="app">
      <header>
        <h1>Garden Grid</h1>
      </header>
      <nav className="tabs">
        <button onClick={() => setSelectedTab('Inventory Management')}>Inventory Management</button>
        <button onClick={() => setSelectedTab('Care Scheduling')}>Care Scheduling</button>
        <button onClick={() => setSelectedTab('Growth Tracking')}>Growth Tracking</button>
      </nav>
      <main>
        {renderContent()}
      </main>
      <footer>
        For technical support contact: <a href="mailto:222@garden.com">222@garden.com</a> or call 333-333-3333
      </footer>
    </div>
  );
}

export default App;
