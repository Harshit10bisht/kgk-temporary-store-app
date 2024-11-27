const authService = require('../services/authService');

const signup = async (req, res) => {
    try {
        const { message, token } = await authService.signup(req.body);
        res.status(201).json({ message, token });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { message, token } = await authService.login(email, password);
        res.json({ message, token });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }
};

const logout = (req, res) => {
    // Here we will clear token from client-side cookies
    res.json({ message: 'Logout successful' });
};

module.exports = {
    signup,
    login,
    logout
};