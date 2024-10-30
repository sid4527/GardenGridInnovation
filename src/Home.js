import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="hero-section">
        <h1>Welcome to the Garden Inventory</h1>
        <p>Explore and manage your garden with ease. Discover plants, track stock, and keep your garden growing!</p>
      </header>

      <main className="main-content">
        <h2>Featured Plants</h2>
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
