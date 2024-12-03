require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const inventoryRoutes = require('./inventory/inventory.routes');

const app = express();
const port = 9000;

// CORS configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://garden-grid-app.vercel.app/', // Default to frontend URL if variable is not set
      process.env.REACT_APP_BACKEND_URL || 'http://3.21.98.193:9000', // Default to backend URL if variable is not set
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers required for API communication
  })
);

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
  .then((pool) => {
    console.log('Database connected successfully');
    return pool;
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    throw err;
  });

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Garden Grid API');
});

// Use the inventory routes
app.use('/api/inventory', inventoryRoutes);

// Add a GET route for /api/users to avoid 404 errors during browser testing
app.get('/api/users', (req, res) => {
  res.send('This is the /api/users endpoint. Please use a POST request to sign up.');
});

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
    const userExists = await pool
      .request()
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
    await pool
      .request()
      .input('UserId', sql.NVarChar, userId)
      .input('PasswordHash', sql.NVarChar, passwordHash)
      .input('Email', sql.NVarChar, email)
      .query(insertUserQuery);

    res.status(201).json({ message: 'Sign-up successful!' });
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(500).json({ message: 'An error occurred during sign-up. Please try again.' });
  }
});

// **Route: Add New Care Task**
app.post('/api/care-tasks', async (req, res) => {
    const { TaskDate, CareType, PlantName, Status, Notes } = req.body;
  
    // Validate required fields
    if (!TaskDate || !CareType || !PlantName || !Status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      const pool = await poolPromise;
  
      const query = `
        INSERT INTO CareTasks (TaskDate, CareType, PlantName, Status, Notes)
        VALUES (@TaskDate, @CareType, @PlantName, @Status, @Notes)
      `;
      await pool.request()
        .input('TaskDate', sql.Date, TaskDate)
        .input('CareType', sql.NVarChar, CareType)
        .input('PlantName', sql.NVarChar, PlantName)
        .input('Status', sql.NVarChar, Status)
        .input('Notes', sql.NVarChar, Notes)
        .query(query);
  
      res.status(201).json({ message: 'New care task added successfully.' });
    } catch (error) {
      console.error('Error adding care task:', error);
      res.status(500).json({ message: 'Failed to add care task.' });
    }
  });
  

// **Route: Fetch Distinct Filter Options**
app.get('/api/inventory/filters', async (req, res) => {
  try {
    const pool = await poolPromise;

    const conditionsResult = await pool.request().query('SELECT DISTINCT Condition FROM Inventory');
    const quantitiesResult = await pool.request().query('SELECT DISTINCT Quantity FROM Inventory');

    res.json({
      conditions: conditionsResult.recordset.map((row) => row.Condition),
      quantities: quantitiesResult.recordset.map((row) => row.Quantity),
    });
  } catch (error) {
    console.error('Failed to fetch filter options:', error);
    res.status(500).json({ message: 'Failed to fetch filter options.' });
  }
});

// **Enhanced Route: Fetch Inventory Items with Filters and Sorting**
app.get('/api/inventory/items', async (req, res) => {
  const { condition, quantity, sortBy } = req.query;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    let query = 'SELECT * FROM Inventory WHERE 1=1';

    if (condition) {
      query += ' AND Condition = @Condition';
      request.input('Condition', sql.NVarChar, condition);
    }
    if (quantity) {
      query += ' AND Quantity = @Quantity';
      request.input('Quantity', sql.Int, quantity);
    }

    if (sortBy) {
      const validSortColumns = ['Condition', 'Quantity'];
      if (validSortColumns.includes(sortBy)) {
        query += ` ORDER BY ${sortBy}`;
      } else {
        return res.status(400).json({ message: 'Invalid sort column specified.' });
      }
    }

    const result = await request.query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error('Failed to fetch inventory items:', error);
    res.status(500).json({ message: 'Failed to fetch inventory items.' });
  }
});

// **Route: Fetch Care Tasks**
app.get('/api/care-tasks', async (req, res) => {
  try {
    const pool = await poolPromise;

    const query = `
      SELECT TaskDate, CareType, PlantName, Status 
      FROM CareTasks
    `;
    const result = await pool.request().query(query);

    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching care tasks:', error);
    res.status(500).json({ message: 'Failed to fetch care tasks.' });
  }
});

// **Route: Login**
app.post('/api/login', async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: 'UserId and Password are required' });
  }

  try {
    const pool = await poolPromise;

    const query = `
      SELECT PasswordHash 
      FROM Users 
      WHERE UserId = @UserId
    `;
    const result = await pool.request()
      .input('UserId', sql.NVarChar, userId)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const storedPasswordHash = result.recordset[0].PasswordHash;
    const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
});

// **Route: Fetch Growth Records**
app.get('/api/growth-records', async (req, res) => {
  try {
    const pool = await poolPromise;

    const query = `
      SELECT RecordDate, PlantName, HeightCM, Notes 
      FROM GrowthRecords
    `;
    const result = await pool.request().query(query);

    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching growth records:', error);
    res.status(500).json({ message: 'Failed to fetch growth records.' });
  }
});

// **Route: Add Growth Records**
app.post('/api/growth-records', async (req, res) => {
  const { date, plant, height, notes } = req.body;

  if (!date || !plant || !height || !notes) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const pool = await poolPromise;

    const query = `
      INSERT INTO GrowthRecords (RecordDate, PlantName, HeightCM, Notes)
      VALUES (@RecordDate, @PlantName, @HeightCM, @Notes)
    `;
    await pool.request()
      .input('Date', sql.Date, date)
      .input('Plant', sql.NVarChar, plant)
      .input('Height', sql.Int, height)
      .input('Notes', sql.NVarChar, notes)
      .query(query);

    res.status(201).json({ message: 'Growth record added successfully.' });
  } catch (error) {
    console.error('Error adding growth record:', error);
    res.status(500).json({ message: 'Failed to add growth record.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
