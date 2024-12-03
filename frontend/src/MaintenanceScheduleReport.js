import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reports.css';

function MaintenanceScheduleReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the environment variable for the backend URL
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL || 'https://3.21.98.193:9000'}/api/care-tasks`);

        console.log('API Response:', response.data); // Log the response
        setData(response.data); // Update state with the response
      } catch (error) {
        console.error('Error fetching maintenance schedule data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return 'Invalid Date';

    const date = new Date(isoDate);
    if (isNaN(date)) return 'Invalid Date';

    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const exportToCSV = () => {
    if (data.length === 0) {
      alert('No data to export!');
      return;
    }

    const headers = ['Task Date', 'Care Type', 'Plant Name', 'Status'];
    const rows = data.map((entry) => [
      formatDate(entry.TaskDate),
      entry.CareType,
      entry.PlantName || 'N/A',
      entry.Status,
    ]);

    const csvContent = [
      headers.join(','), // Add the headers as the first row
      ...rows.map((row) => row.join(',')), // Add each data row
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'maintenance_schedule_report.csv';
    link.click();

    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div className="report">
      <h2 className="report-title">Maintenance Schedule Report</h2>
      <div className="report-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>Task Date</th>
              <th>Care Type</th>
              <th>Plant Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>
              </tr>
            ) : (
              data.map((entry, index) => (
                <tr key={index}>
                  <td>{formatDate(entry.TaskDate)}</td>
                  <td>{entry.CareType}</td>
                  <td>{entry.PlantName || 'N/A'}</td>
                  <td>{entry.Status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <button className="export-button" onClick={exportToCSV}>
        Export to CSV
      </button>
    </div>
  );
}

export default MaintenanceScheduleReport;
