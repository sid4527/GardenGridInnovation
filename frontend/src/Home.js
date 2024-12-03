import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">🌿 Garden Grid</div>
          <div className="navbar-links">
            <a href="/">Home</a>
            <a href="/inventory">Inventory</a>
            <a href="/inventory-management">Entries</a>
            <a href="/resources">Resources</a>
            <a href="/reports">Reports</a>
            <a href="/login">Log Out</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Garden Grid</h1>
        <p>
        Effortlessly manage your garden inventory, care schedules, and growth tracking—all in one place.
        </p>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <h2>Featured Plants</h2>
        <div className="image-grid">
          {/* Plant Images with External Links */}
          <a href="https://en.wikipedia.org/wiki/Rose" className="image-item" target="_blank" rel="noopener noreferrer">
            🌹
            <span className="plant-name">Rose</span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Lavender" className="image-item" target="_blank" rel="noopener noreferrer">
            🌿
            <span className="plant-name">Lavender</span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Tulip" className="image-item" target="_blank" rel="noopener noreferrer">
            🌷
            <span className="plant-name">Tulip</span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Cactus" className="image-item" target="_blank" rel="noopener noreferrer">
            🌵
            <span className="plant-name">Cactus</span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Fern" className="image-item" target="_blank" rel="noopener noreferrer">
            🍃
            <span className="plant-name">Fern</span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Cherry_blossom" className="image-item" target="_blank" rel="noopener noreferrer">
            🌸
            <span className="plant-name">Cherry Blossom</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          For technical support contact:{' '}
          <a href="mailto:222@garden.com">222@garden.com</a> or call
          333-333-2222
        </p>
        <p>© 2024 Garden Inventory. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
