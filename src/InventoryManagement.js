import React, { useState } from 'react';
import './InventoryManagement.css';

function InventoryManagement() {
  const [showForm, setShowForm] = useState(false);

  const handleNewEntry = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="inventory-management">
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
    </div>
  );
}

export default InventoryManagement;
