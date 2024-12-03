import React from 'react';
import { Link } from 'react-router-dom';
import './Reports.css';

function Reports() {
  return (
    <div className="reports">
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

      <div className="reports-content">
        <main className="content">
          <h2>Reports Menu</h2>

          <div className="report-grid">
            <section className="report-card">
              <h3>Administrator Reports</h3>
              <ul>
                <li><Link to="/InventoryOverviewReport">Inventory Overview Report</Link></li>
              </ul>
            </section>

            <section className="report-card">
              <h3>Management Reports</h3>
              <ul>
                <li><Link to="/MaintenanceScheduleReport">Maintenance Schedule Report</Link></li>
              </ul>
            </section>
          </div>
          
        </main>

        <footer className="footer">
          For technical support contact: <a href="mailto:222@garden.com">222@garden.com</a> or call 333-333-3333
        </footer>
      </div>
    </div>
  );
}

export default Reports;
