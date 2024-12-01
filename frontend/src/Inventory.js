import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';
import { FaFileExport } from 'react-icons/fa';

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [filterCondition, setFilterCondition] = useState('');
  const [filterQuantity, setFilterQuantity] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [conditions, setConditions] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [error, setError] = useState('');

  // Fetch inventory items and filter options when the component mounts
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const [itemsResponse, filtersResponse] = await Promise.all([
          axios.get('http://localhost:9000/api/inventory/items'),
          axios.get('http://localhost:9000/api/inventory/filters'), // Backend route for filters
        ]);

        setInventoryItems(itemsResponse.data); // Set inventory items
        setConditions(filtersResponse.data.conditions); // Set filter options for condition
        setQuantities(filtersResponse.data.quantities); // Set filter options for quantity
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      }
    };

    fetchInventoryData();
  }, []);

  // Handle filtering and sorting logic
  const handleFilterSort = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/inventory/items', {
        params: { condition: filterCondition, quantity: filterQuantity, sortBy },
      });
      setInventoryItems(response.data); // Update inventory list based on filters and sorting
    } catch (err) {
      setError('Failed to apply filters or sorting. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="inventory">
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
        {inventoryItems.length > 0 ? (
          <ul className="inventory-list">
            {inventoryItems.map((item, index) => (
              <li key={index} className="inventory-item">
                {item.item} {/* Assuming your backend returns an 'item' field */}
              </li>
            ))}
          </ul>
        ) : (
          !error && <p>Loading inventory items...</p>
        )}
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
