import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './InventoryManagement.css';

function InventoryManagement() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleNewEntry = () => {
    setShowForm(!showForm);
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div className="inventory-management">
      <header className="header">
        <h2>Garden Grid Inventory</h2>
      </header>

      <nav className="tabs">
        <Link to="/inventory-management" className="tab">Inventory Management</Link>
        <Link to="/care-scheduling" className="tab">Care Scheduling</Link>
        <Link to="/growth-tracking" className="tab">Growth Tracking</Link>
      </nav>

      <div className="content">
        <h2>Inventory Management</h2>
        <button className="new-entry-button" onClick={handleNewEntry}>+ New Entry</button>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows */}
            <tr>
              <td>2024-10-31</td>
              <td>Rose Bush</td>
              <td>15</td>
              <td>Healthy</td>
            </tr>
            <tr>
              <td>2024-10-31</td>
              <td>Lavender</td>
              <td>20</td>
              <td>Healthy</td>
            </tr>
          </tbody>
        </table>

        {showForm && (
          <div className="entry-form">
            <h3>Add New Inventory Item</h3>
            <label>
              Date: <input type="date" />
            </label>
            <label>
              Item:
              <select>
                <option value="item1">Rose Bush</option>
                <option value="item2">Lavender</option>
              </select>
            </label>
            <label>
              Quantity: <input type="number" />
            </label>
            <label>
              Condition:
              <select>
                <option value="healthy">Healthy</option>
                <option value="needs-attention">Needs Attention</option>
              </select>
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

export default InventoryManagement;
