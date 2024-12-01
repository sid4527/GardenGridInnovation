const usersService = require('./users.service');

// Controller for user sign-up
const signup = async (req, res) => {
    const { userId, password, email } = req.body;

    // Validate inputs
    if (!userId || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await usersService.createUser(userId, password, email);
        if (result.success) {
            res.status(201).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Sign-up error:', error);
        res.status(500).json({ message: 'An error occurred during sign-up. Please try again.' });
    }
};

module.exports = { signup };
