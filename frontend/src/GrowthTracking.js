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
  const navigate = useNavigate();

  const handleNewEntry = () => {
    setShowForm(!showForm);
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/api/growth-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RecordDate: formData.date,
          PlantName: formData.plant,
          HeightCM: formData.height,
          Notes: formData.notes,
        }),
      });

      if (response.ok) {
        console.log('New growth record added successfully');
        setShowForm(false); // Hide the form after successful submission
        setFormData({ date: '', plant: 'Rose Bush', height: '', notes: '' }); // Reset the form
        // Optionally, refresh the table to show the new entry
      } else {
        console.error('Failed to add new growth record');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
                Notes: <input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="Growth observations..." />
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

export default GrowthTracking;
