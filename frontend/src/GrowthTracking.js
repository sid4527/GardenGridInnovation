import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './GrowthTracking.css';

function GrowthTracking() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    plant: 'Rose Bush',
    height: '',
    notes: '',
  });
  const [records, setRecords] = useState([
    { date: '2024-11-01', plant: 'Rose Bush', height: '30 cm', notes: 'Healthy growth observed' },
    { date: '2024-11-02', plant: 'Lavender', height: '25 cm', notes: 'New leaves forming' },
  ]);
  const navigate = useNavigate();

  const handleNewEntry = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = {
      date: formData.date,
      plant: formData.plant,
      height: `${formData.height} cm`,
      notes: formData.notes,
    };

    try {
      const response = await fetch('http://localhost:9000/api/growth-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: formData.date, // Match the field names expected by the backend
          plant: formData.plant,
          height: formData.height,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        alert('New growth record added successfully!');
        setRecords([...records, newRecord]); // Append the new record to the list
        setShowForm(false); // Hide the form after successful submission
        setFormData({ date: '', plant: 'Rose Bush', height: '', notes: '' }); // Reset the form
      } else {
        const errorData = await response.json();
        console.error('Failed to add new growth record:', errorData.message);
        alert(`Failed to add new growth record: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="growth-tracking">
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
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.plant}</td>
                <td>{record.height}</td>
                <td>{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && (
          <div className="entry-form">
            <h3>Add New Growth Record</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Date: <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </label>
              <label>
                Plant:
                <select name="plant" value={formData.plant} onChange={handleChange}>
                  <option value="Rose Bush">Rose Bush</option>
                  <option value="Lavender">Lavender</option>
                </select>
              </label>
              <label>
                Height (cm): <input type="number" name="height" value={formData.height} onChange={handleChange} required />
              </label>
              <label>
                Notes: <input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="Describe growth observations..." />
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default GrowthTracking;
