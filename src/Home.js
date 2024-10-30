import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">

      <nav className="tabs">
        <button className="tab">Home</button>
        <button className="tab">Inventory</button>
        <button className="tab">Entries</button>
        <button className="tab">Resources</button>
        <button className="tab">Reports</button>

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
