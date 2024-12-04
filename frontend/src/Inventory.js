import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Inventory.css";
import { FaFileExport } from "react-icons/fa";

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [filterCondition, setFilterCondition] = useState("");
  const [filterQuantity, setFilterQuantity] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [conditions, setConditions] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const [itemsResponse, filtersResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL || 'https://3.21.98.193:9000'}/api/inventory/items`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL || 'https://3.21.98.193:9000'}/api/inventory/filters`),
        ]);
        setInventoryItems(itemsResponse.data);
        setConditions(filtersResponse.data.conditions);
        setQuantities(filtersResponse.data.quantities);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error(err);
      }
    };

    fetchInventoryData();
  }, []);

  const handleFilterSort = async () => {
    try {
      const params = {
        condition: filterCondition || undefined,
        quantity: filterQuantity ? parseInt(filterQuantity, 10) : undefined,
        sortBy: sortBy || undefined,
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL || 'https://3.21.98.193:9000'}/api/inventory/items`,
        { params }
      );
      setInventoryItems(response.data);
    } catch (err) {
      setError("Failed to apply filters or sorting. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="inventory">
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

      <h1 className="inventory-title">Garden Inventory</h1>

      <div className="filter-sort-section">
        <div className="filter-group">
          <h3>Filter By:</h3>
          <div className="filter-row">
            <div className="filter-item">
              <label>Condition:</label>
              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
              >
                <option value="">All Conditions</option>
                {conditions.map((condition, index) => (
                  <option key={index} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>Quantity:</label>
              <select
                value={filterQuantity}
                onChange={(e) => setFilterQuantity(e.target.value)}
              >
                <option value="">All Quantities</option>
                {quantities.map((quantity, index) => (
                  <option key={index} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="sort-group">
          <h3>Sort By:</h3>
          <div className="filter-row">
            <div className="filter-item">
              <label>Sort:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Select</option>
                <option value="Condition">Condition</option>
                <option value="Quantity">Quantity</option>
              </select>
            </div>
          </div>
        </div>

        <button onClick={handleFilterSort} className="apply-button">
          Apply Filters & Sort
        </button>
      </div>

      <div className="inventory-content">
        {error && <p className="error-message">{error}</p>}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>{item.quantity}</td>
                <td>{item.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="footer">
        For technical support, contact: <a href="mailto:222@garden.com">222@garden.com</a> or call 333-333-3333
      </footer>
    </div>
  );
}

export default Inventory;
