const express = require('express');
const sql = require('mssql/msnodesqlv8');

const app = express();
const port = 3000;

// SQL Server configuration
const config = {
    connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=yes;',
};

// Connect to the database
sql.connect(config)
    .then(pool => {
        console.log('Connected to SQL Server');

        // Define a simple route
        app.get('/', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM MSreplication_options'); // Change to your table
                
                // Log the rows to the terminal
                console.log('Rows from MSreplication_options:', result.recordset);
                
                // Send the result as a response
                res.json(result.recordset);
            } catch (err) {
                console.error('Query error:', err); // Log the error in the console
                res.status(500).send(err.message);
            }
        });

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });
