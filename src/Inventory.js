import React from 'react';
import './Inventory.css';
import { FaChevronDown, FaFileExport } from 'react-icons/fa';

function Inventory() {
  return (
    <div className="inventory">
      
      <div className="filter-sort-section">
        <div className="filter-group">
          <h3>Filter By:</h3>
          <div className="filter-row">
            {["Category", "Condition", "Supplier", "Price", "Quantity", "Plant Type", "Stock", "Status"].map((label) => (
              <div className="filter-item" key={label}>
                <label>{label}</label>
                <select>
                  <option>All {label}</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="sort-group">
          <h3>Sort By:</h3>
          <div className="filter-row">
            {["Category", "Condition", "Supplier", "Price", "Quantity", "Plant Type", "Stock", "Status"].map((label) => (
              <div className="filter-item" key={label}>
                <label>{label}</label>
                <select>
                  <option>Sort by {label}</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="inventory-content">
        <p>Inventory images and items will be displayed here in a grid layout.</p>
      </div>

      <button className="export-button">
        <FaFileExport /> Export to CSV
      </button>

      <footer className="footer">
        For technical support, contact: <a href="mailto:222@garden.com">222@garden.com</a> or call 333-333-3333
      </footer>
    </div>
  );
}

export default Inventory;
