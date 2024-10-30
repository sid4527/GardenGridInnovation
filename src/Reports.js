import React from 'react';
import './Reports.css';

function Reports() {
  return (
    <div className="reports">
      <header className="header">
        <h1>Garden Grid</h1>
      </header>

      <main className="content">
        <h2>Reports Menu</h2>

        <section className="report-section">
          <h3>Administrator Reports</h3>
          <ul>
            <li>Sales Report</li>
            <li>Inventory Overview Report</li>
          </ul>
        </section>

        <section className="report-section">
          <h3>Management Reports</h3>
          <ul>
            <li>Plant Health Report</li>
            <li>Customer Order Report</li>
            <li>Maintenance Schedule Report</li>
          </ul>
        </section>

        <div className="export-section">
          <p>The button below will be an option on each report</p>
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
