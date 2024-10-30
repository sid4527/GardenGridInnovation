import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="header">
        <h1>Garden Grid</h1>
      </header>

      <nav className="tabs">
        <button className="tab">Home</button>
        <button className="tab">Inventory</button>
        <button className="tab">Entries</button>
        <button className="tab">Resources</button>
        <button className="tab">Reports</button>

        <div className="search-bar">
          <label htmlFor="search">Search Bar:</label>
          <input type="text" id="search" />
        </div>
      </nav>

      <main className="main-content">
        <p>** Home page image array will be inserted here **</p>
      </main>

      <footer className="footer">
        For technical support contact: <a href="mailto:222@garden.com">222@garden.com</a> or call 333-333-3333
      </footer>
    </div>
  );
}

export default Home;
