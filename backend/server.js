require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const inventoryRoutes = require('./inventory/inventory.routes');

const app = express();
const port = 9000;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON bodies
app.use(express.json());

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

// Create a global pool promise
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Database connected successfully');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed:', err.message);
        throw err;
    });

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Garden Grid API');
});

// Use the inventory routes
app.use('/api/inventory', inventoryRoutes);

// Route to handle user sign-up
app.post('/api/users', async (req, res) => {
    const { userId, password, email } = req.body;

    if (!userId || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const pool = await poolPromise;

        const checkUserQuery = `
            SELECT COUNT(*) AS UserCount 
            FROM Users 
            WHERE UserId = @UserId OR Email = @Email
        `;
        const userExists = await pool.request()
            .input('UserId', sql.NVarChar, userId)
            .input('Email', sql.NVarChar, email)
            .query(checkUserQuery);

        if (userExists.recordset[0].UserCount > 0) {
            return res.status(400).json({ message: 'UserId or Email already exists' });
        }

        const insertUserQuery = `
            INSERT INTO Users (UserId, PasswordHash, Email)
            VALUES (@UserId, @PasswordHash, @Email)
        `;
        await pool.request()
            .input('UserId', sql.NVarChar, userId)
            .input('PasswordHash', sql.NVarChar, passwordHash)
            .input('Email', sql.NVarChar, email)
            .query(insertUserQuery);

        res.status(201).json({ message: 'Sign-up successful!' });
    } catch (error) {
        console.error('Sign-up error:', error.message);
        res.status(500).json({ message: 'An error occurred during sign-up. Please try again.' });
    }
});

// Route to handle user login
app.post('/api/login', async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const pool = await poolPromise;

        const query = `
            SELECT * FROM Users WHERE UserId = @UserId
        `;
        const result = await pool.request()
            .input('UserId', sql.NVarChar, userId)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result.recordset[0];
        const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', userId: user.UserId });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'An error occurred during login. Please try again.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
