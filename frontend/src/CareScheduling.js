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
  const [tasks, setTasks] = useState([ // State to store tasks
    { date: '2024-11-01', plant: 'Rose Bush', careType: 'Watering', status: 'Completed' },
    { date: '2024-11-02', plant: 'Lavender', careType: 'Fertilizing', status: 'Pending' },
  ]);
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

    const newTask = {
      date: formData.date,
      plant: formData.plant,
      careType: formData.careType,
      status: 'Pending', // Default status on submission
    };

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
          Status: 'Pending',
          Notes: formData.notes,
        }),
      });

      if (response.ok) {
        console.log('New care task added successfully');
        setTasks([...tasks, newTask]); // Append the new task to the list
        setShowForm(false); // Hide the form after successful submission
        setFormData({ date: '', plant: 'Rose Bush', careType: 'Watering', notes: '' }); // Reset the form
      } else {
        console.error('Failed to add new care task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="care-scheduling">
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

      </div>
    </div>
  );
}

export default CareScheduling;
