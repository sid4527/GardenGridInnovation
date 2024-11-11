import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './InventoryManagement.css';

function InventoryManagement() {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [item, setItem] = useState('Rose Bush');
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState('Healthy');
  const navigate = useNavigate();

  const handleNewEntry = () => {
    setShowForm(!showForm);
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const newEntry = {
      date,
      item,
      quantity: parseInt(quantity), // Ensure quantity is a number
      condition,
    };

    try {
      // Send the data to the backend API
      await axios.post('http://localhost:9000/api/inventory', newEntry);
      alert('New inventory item added successfully!');
      setShowForm(false);
      // Optionally, reload or refresh the data in your table here
    } catch (error) {
      console.error('Error adding new inventory item:', error);
      alert('Failed to add new inventory item.');
    }
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
            <form onSubmit={handleSubmit}>
              <label>
                Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </label>
              <label>
                Item:
                <select value={item} onChange={(e) => setItem(e.target.value)}>
                  <option value="Rose Bush">Rose Bush</option>
                  <option value="Lavender">Lavender</option>
                  <option value="Carnation">Carnation</option>
                  <option value="Marigold">Marigold</option>
                  <option value="Begonia">Begonia</option>
                  <option value="Daffodil">Daffodil</option>
                </select>
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </label>
              <label>
                Condition:
                <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                  <option value="Healthy">Healthy</option>
                  <option value="Needs Attention">Needs Attention</option>
                </select>
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
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
