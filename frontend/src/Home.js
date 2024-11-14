import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">🌿 Garden Inventory</div>
          <div className="navbar-links">
            <a href="/">Home</a>
            <a href="/inventory">Inventory</a>
            <a href="/inventory-management">Entries</a>
            <a href="/resources">Resources</a>
            <a href="/reports">Reports</a>
            <a href="/userprofiles">Userprofiles</a>
            <a href="/login">Log Out</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Bring Nature to Your Home!</h1>
        <p>We are a studio based in New York, providing hassle-free backyard transformations with artistic solution.</p>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <h2>Featured Plant</h2>
        <div className="image-grid">
          {/* Placeholder for plant images */}
          <div className="image-item">🌱</div>
          <div className="image-item">🌿</div>
          <div className="image-item">🌸</div>
          <div className="image-item">🌵</div>
          <div className="image-item">🍃</div>
          <div className="image-item">🌷</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          For technical support contact: <a href="mailto:222@garden.com">222@garden.com</a> or call 333-333-2222
        </p>
        <p>© 2024 Garden Inventory. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
