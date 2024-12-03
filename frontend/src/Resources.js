import React from 'react';
import { Link } from 'react-router-dom';
import './Resources.css';

function Resources() {
  return (
    <div className="resources">
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

      <main className="content">
        <h1 className="resources-title">Garden Resources</h1>
        <p className="resources-description">
          Your go-to library for garden management tips, tutorials, and updates.
        </p>

        <div className="resource-grid">
        <section className="resource-card">
          <h3>Guides and Tutorials</h3>
          <p>Learn best practices and techniques for managing your garden inventory.</p>
          <button 
            className="resource-button" 
            onClick={() => window.open('https://www.comcash.com/blog/garden-center-inventory-management-tips', '_blank')}
          >
            Explore Guides
          </button>
        </section>


          <section className="resource-card">
            <h3>Video Resources</h3>
            <p>Watch video tutorials to master your garden inventory system.</p>
            <button 
            className="resource-button" 
            onClick={() => window.open('https://www.youtube.com/watch?v=2-OsAxK-Y-0', '_blank')}
            >
              Watch Videos
            </button>
          </section>

          <section className="resource-card">
            <h3>Blog Posts and Articles</h3>
            <p>Read the latest insights and tips from industry experts.</p>
            <button 
            className="resource-button" 
            onClick={() => window.open('https://plantingjustice.org/blogs/all?gad_source=1&gclid=EAIaIQobChMIzNDg3IKHigMVTEH_AR1UBDd8EAAYASAAEgL3kvD_BwE', '_blank')}
            >
              Read Articles
            </button>
          </section>

          <section className="resource-card">
            <h3>News and Updates</h3>
            <p>Stay informed with the latest news and system updates.</p>
            <button 
            className="resource-button" 
            onClick={() => window.open('https://www.gardencentermag.com/tag/inventory-management-/', '_blank')}
            >
              Get Updates
            </button>
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>
          For technical support contact: <a href="mailto:222@garden.com">222@garden.com</a> or call
          333-333-3333
        </p>
      </footer>
    </div>
  );
}

export default Resources;
