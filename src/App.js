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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  // Define callAPI as a class method
  callAPI = () => {
    fetch("http://localhost:9000/api/inventory")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  // Use componentDidMount instead of componentWillMount
  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <Router>
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
          </Routes>
        </main>
        </div>
      </Router>
    );
  }
}

export default App;