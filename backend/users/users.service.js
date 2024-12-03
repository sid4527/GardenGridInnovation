const sql = require('mssql');
const bcrypt = require('bcrypt');
const dbConfig = require('../server').dbConfig; // Import dbConfig from server.js

// Service for creating a new user
const createUser = async (userId, password, email) => {
    try {
        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Check if the user already exists
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
            return { success: false, message: 'UserId or Email already exists' };
        }

        // Insert the new user
        const insertUserQuery = `
            INSERT INTO Users (UserId, PasswordHash, Email)
            VALUES (@UserId, @PasswordHash, @Email)
        `;
        await pool.request()
            .input('UserId', sql.NVarChar, userId)
            .input('PasswordHash', sql.NVarChar, passwordHash)
            .input('Email', sql.NVarChar, email)
            .query(insertUserQuery);

        return { success: true, message: 'Sign-up successful!' };
    } catch (error) {
        console.error('Database error:', error);
        return { success: false, message: 'Database error occurred.' };
    }
};

module.exports = { createUser };
