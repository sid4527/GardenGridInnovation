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
  const [records, setRecords] = useState([ // State to store inventory records
    { date: '2024-10-31', item: 'Rose Bush', quantity: 15, condition: 'Healthy' },
    { date: '2024-10-31', item: 'Lavender', quantity: 20, condition: 'Healthy' },
  ]);
  const navigate = useNavigate();

  const handleNewEntry = () => {
    setShowForm(!showForm);
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      date,
      item,
      quantity: parseInt(quantity), // Ensure quantity is a number
      condition,
    };

    try {
      // Send the data to the backend API
      await axios.post('http://localhost:9000/api/inventory', newEntry);
      setRecords([...records, newEntry]); // Append the new entry to the list
      alert('New inventory item added successfully!');
      setShowForm(false); // Hide the form
      setDate(''); // Reset the form fields
      setItem('Rose Bush');
      setQuantity('');
      setCondition('Healthy');
    } catch (error) {
      console.error('Error adding new inventory item:', error);
      alert('Failed to add new inventory item.');
    }
  };

  return (
    <div className="inventory-management">
       <header className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">🌿 Garden Grid</div>
          <nav className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/inventory-management">Entries</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/login">Log Out</Link>
          </nav>
        </div>
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
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.item}</td>
                <td>{record.quantity}</td>
                <td>{record.condition}</td>
              </tr>
            ))}
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

      </div>
    </div>
  );
}

export default InventoryManagement;
