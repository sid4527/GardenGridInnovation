import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CareScheduling.css';

function CareScheduling() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleNewEntry = () => {
    setShowForm(!showForm);
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div className="care-scheduling">
      <header className="header">
        <h2>Garden Grid Care Scheduling</h2>
      </header>

      <nav className="tabs">
        <Link to="/inventory-management" className="tab">Inventory Management</Link>
        <Link to="/care-scheduling" className="tab">Care Scheduling</Link>
        <Link to="/growth-tracking" className="tab">Growth Tracking</Link>
      </nav>

      <div className="content">
        <h2>Care Scheduling</h2>
        <button className="new-entry-button" onClick={handleNewEntry}>+ New Entry</button>

        <table className="scheduling-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Plant</th>
              <th>Care Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows */}
            <tr>
              <td>2024-11-01</td>
              <td>Rose Bush</td>
              <td>Watering</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>2024-11-02</td>
              <td>Lavender</td>
              <td>Fertilizing</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>

        {showForm && (
          <div className="entry-form">
            <h3>Add New Care Task</h3>
            <label>
              Date: <input type="date" />
            </label>
            <label>
              Plant:
              <select>
                <option value="rose">Rose Bush</option>
                <option value="lavender">Lavender</option>
              </select>
            </label>
            <label>
              Care Type:
              <select>
                <option value="watering">Watering</option>
                <option value="fertilizing">Fertilizing</option>
                <option value="pruning">Pruning</option>
              </select>
            </label>
            <label>
              Notes: <input type="text" placeholder="Any special notes..." />
            </label>
            <button className="submit-button">Submit</button>
          </div>
        )}

        <button className="login-button" onClick={handleLoginRedirect}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default CareScheduling;
