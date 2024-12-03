const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');

// Route for user sign-up
router.post('/users', usersController.signup);

module.exports = router;
