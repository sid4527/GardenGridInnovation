import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Inventory from './Inventory';
import Resources from './Resources';
import Reports from './Reports';
import InventoryManagement from './InventoryManagement';
import CareScheduling from './CareScheduling';
import GrowthTracking from './GrowthTracking';
import Login from './Login';
import SignupPage from './SignupPage';
import InventoryOverviewReport from './InventoryOverviewReport';
import MaintenanceScheduleReport from './MaintenanceScheduleReport';
import './App.css';

const App = () => {
  return (
    <div className="app">
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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/InventoryOverviewReport" element={<InventoryOverviewReport />} />
          <Route path="/MaintenanceScheduleReport" element={<MaintenanceScheduleReport />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
