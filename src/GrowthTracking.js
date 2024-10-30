import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './GrowthTracking.css';

function GrowthTracking() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleNewEntry = () => {
    setShowForm(!showForm);
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div className="growth-tracking">
      <header className="header">
        <h2>Garden Grid Growth Tracking</h2>
      </header>

      <nav className="tabs">
        <Link to="/inventory-management" className="tab">Inventory Management</Link>
        <Link to="/care-scheduling" className="tab">Care Scheduling</Link>
        <Link to="/growth-tracking" className="tab">Growth Tracking</Link>
      </nav>

      <div className="content">
        <h2>Growth Tracking</h2>
        <button className="new-entry-button" onClick={handleNewEntry}>+ New Entry</button>

        <table className="growth-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Plant</th>
              <th>Height</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows */}
            <tr>
              <td>2024-11-01</td>
              <td>Rose Bush</td>
              <td>30 cm</td>
              <td>Healthy growth observed</td>
            </tr>
            <tr>
              <td>2024-11-02</td>
              <td>Lavender</td>
              <td>25 cm</td>
              <td>New leaves forming</td>
            </tr>
          </tbody>
        </table>

        {showForm && (
          <div className="entry-form">
            <h3>Add New Growth Record</h3>
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
              Height (cm): <input type="number" />
            </label>
            <label>
              Notes: <input type="text" placeholder="Growth observations..." />
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

export default GrowthTracking;
