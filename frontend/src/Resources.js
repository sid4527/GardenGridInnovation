import React from 'react';
import './Resources.css';

function Resources() {
  return (
    <div className="resources">
      <header className="header">
        <h1>Garden Resources</h1>
        <p>Your go-to library for garden management tips, tutorials, and updates.</p>
      </header>

      <main className="content">
        <h2>Explore Our Resources</h2>

        <div className="resource-grid">
          <section className="resource-card">
            <h3>Guides and Tutorials</h3>
            <p>Learn best practices and techniques for managing your garden inventory.</p>
            <button className="resource-button">Explore Guides</button>
          </section>

          <section className="resource-card">
            <h3>Video Resources</h3>
            <p>Watch video tutorials to master your garden inventory system.</p>
            <button className="resource-button">Watch Videos</button>
          </section>

          <section className="resource-card">
            <h3>Blog Posts and Articles</h3>
            <p>Read the latest insights and tips from industry experts.</p>
            <button className="resource-button">Read Articles</button>
          </section>

          <section className="resource-card">
            <h3>News and Updates</h3>
            <p>Stay informed with the latest news and system updates.</p>
            <button className="resource-button">Get Updates</button>
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>For technical support contact: <a href="mailto:222@garden.com">222@garden.com</a> or call 333-333-3333</p>
      </footer>
    </div>
  );
}

export default Resources;
