require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const inventoryRoutes = require('./inventory/inventory.routes'); // Update this path if needed

const app = express();
const port = 9000;

app.use(cors({
    origin: 'http://localhost:3000', // Allow only the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Database configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Connect to the database
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected successfully');
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Garden Grid API');
});

// Use the inventory routes
app.use('/api/inventory', inventoryRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});