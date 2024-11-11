import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CareScheduling.css';

function CareScheduling() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    plant: 'Rose Bush',
    careType: 'Watering',
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
      const response = await fetch('http://localhost:9000/api/care-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TaskDate: formData.date,
          PlantName: formData.plant,
          CareType: formData.careType,
          Status: 'Pending', // Default status on submission
          Notes: formData.notes,
        }),
      });

      if (response.ok) {
        console.log('New care task added successfully');
        setShowForm(false); // Hide the form after successful submission
        setFormData({ date: '', plant: 'Rose Bush', careType: 'Watering', notes: '' }); // Reset the form
        // Optionally, refresh the table to show the new entry
      } else {
        console.error('Failed to add new care task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
                Care Type:
                <select name="careType" value={formData.careType} onChange={handleChange}>
                  <option value="Watering">Watering</option>
                  <option value="Fertilizing">Fertilizing</option>
                  <option value="Pruning">Pruning</option>
                </select>
              </label>
              <label>
                Notes: <input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special notes..." />
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

export default CareScheduling;
