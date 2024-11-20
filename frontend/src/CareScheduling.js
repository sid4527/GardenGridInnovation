import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CareScheduling() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ date: '', plant: '', careType: '', notes: '' });
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState([
    { date: '2024-11-01', plant: 'Rose Bush', careType: 'Watering', status: 'Completed' },
    { date: '2024-11-02', plant: 'Lavender', careType: 'Fertilizing', status: 'Pending' },
  ]);

  const toggleForm = () => {
    setShowForm(!showForm);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.plant || !formData.careType) {
      setError('All fields are required');
      return;
    }
    try {
      const response = await axios.post('/api/care-scheduling', formData);
      if (response.data.success) {
        setTasks([...tasks, { ...formData, status: 'Pending' }]);
        setShowForm(false);
        setFormData({ date: '', plant: '', careType: '', notes: '' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="care-scheduling" role="main">
      <header className="header">
        <h1>Garden Grid Care Scheduling</h1>
      </header>
      <nav aria-label="Navigation Tabs" className="tabs">
        <a className="tab" href="/inventory-management">Inventory Management</a>
        <a className="tab" href="/care-scheduling">Care Scheduling</a>
        <a className="tab" href="/growth-tracking">Growth Tracking</a>
      </nav>
      <div className="content">
        <h2>Care Scheduling</h2>
        <button className="new-entry-button" aria-expanded={showForm} onClick={toggleForm}>
          + New Entry
        </button>
        {showForm && (
          <div className="entry-form" role="form">
            <h3>Add New Care Task</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="date">
                Date:
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
              </label>
              <label htmlFor="plant">
                Plant:
                <select id="plant" name="plant" value={formData.plant} onChange={handleChange}>
                  <option value="Rose Bush">Rose Bush</option>
                  <option value="Lavender">Lavender</option>
                </select>
              </label>
              <label htmlFor="careType">
                Care Type:
                <select id="careType" name="careType" value={formData.careType} onChange={handleChange}>
                  <option value="Watering">Watering</option>
                  <option value="Fertilizing">Fertilizing</option>
                  <option value="Pruning">Pruning</option>
                </select>
              </label>
              <label htmlFor="notes">
                Notes:
                <input type="text" id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special notes..." />
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        )}
        <table className="scheduling-table" role="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Plant</th>
              <th scope="col">Care Type</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.date}</td>
                <td>{task.plant}</td>
                <td>{task.careType}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="login-button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
}

export default CareScheduling;
