import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './InventoryManagement.css';

function InventoryManagement() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleNewEntry = () => {
    setShowForm(!showForm);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="inventory-management">
      <header className="header">
        <h2>Garden Grid</h2>
      </header>

      <nav className="tabs">
        <Link to="/inventory-management" className="tab">Inventory Management</Link>
        <Link to="/care-scheduling" className="tab">Care Scheduling</Link>
        <Link to="/growth-tracking" className="tab">Growth Tracking</Link>
      </nav>

      <div className="content">
        <h2>Inventory Management</h2>
        <button className="new-entry-button" onClick={handleNewEntry}>+ New Entry</button>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Relevant Column</th>
              <th>Relevant Column</th>
              <th>Relevant Column</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample data rows can go here */}
          </tbody>
        </table>

        {showForm && (
          <div className="entry-form">
            <label>
              Date: <input type="date" />
            </label>
            <label>
              Item:
              <select>
                <option value="item1">Item 1</option>
                <option value="item2">Item 2</option>
                {/* Add other options as needed */}
              </select>
            </label>
            <label>
              Reason for addition: <input type="text" />
            </label>
          </div>
        )}

        {/* Button to redirect to login page */}
        <button className="login-button" onClick={handleLoginRedirect}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default InventoryManagement;
