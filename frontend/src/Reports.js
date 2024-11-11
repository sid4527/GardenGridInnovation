import React from 'react';
import './Reports.css';

function Reports() {
  return (
    <div className="reports">
      <header className="header">
        <h1>Reports Dashboard</h1>
        <p>Access detailed reports and insights to manage your garden inventory efficiently.</p>
      </header>
        
      <main className="content">
        <h2>Reports Menu</h2>

        <div className="report-grid">
          <section className="report-card">
            <h3>Administrator Reports</h3>
            <ul>
              <li>Sales Report</li>
              <li>Inventory Overview Report</li>
            </ul>
          </section>

          <section className="report-card">
            <h3>Management Reports</h3>
            <ul>
              <li>Plant Health Report</li>
              <li>Customer Order Report</li>
              <li>Maintenance Schedule Report</li>
            </ul>
          </section>
        </div>

        <div className="export-section">
          <p>Click below to export any report as a CSV file:</p>
          <button className="export-button">Export to CSV</button>
        </div>
      </main>

      <footer className="footer">
        For technical support contact: <a href="mailto:222@garden.com">222@garden.com</a> or call 333-333-3333
      </footer>
    </div>
  );
}

export default Reports;
