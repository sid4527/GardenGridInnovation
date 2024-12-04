import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reports.css';

function InventoryOverviewReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/inventory/items'); // Replace with deployed API URL
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Expected an array but received:', response.data);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const exportToCSV = () => {
    if (data.length === 0) {
      alert('No data to export!');
      return;
    }

    const headers = ['Date', 'Item', 'Quantity', 'Condition'];
    const rows = data.map((entry) => [
      formatDate(entry.date),
      entry.item,
      entry.quantity,
      entry.condition,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'inventory_overview_report.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="report">
      <h2 className="report-title">Inventory Overview Report</h2>
      <div className="report-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No data available
                </td>
              </tr>
            ) : (
              data.map((entry, index) => (
                <tr key={index}>
                  <td>{formatDate(entry.date)}</td>
                  <td>{entry.item}</td>
                  <td>{entry.quantity}</td>
                  <td>{entry.condition}</td>
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

export default InventoryOverviewReport;
