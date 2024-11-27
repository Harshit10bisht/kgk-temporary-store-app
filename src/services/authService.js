const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');

// Signup Service
const signup = async (userdata) => {
    try {
        const userExists = await User.findOne({ where: { email: userdata.email } });
        if (userExists) {
            throw { status: 400, message: 'User already exists' };
        }

        const user = await User.create(userdata);
        return { message: 'User created successfully', token: generateToken({ id: user.id }) };
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
};

// Login Service
const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.matchPassword(password))) {
            throw { status: 401, message: 'Invalid email or password' };
        }

        return { message: 'Login successful', token: generateToken({ id: user.id }) };
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

// Logout Service
const logout = async (token) => {
    // Here, we can remove the token from the client side, but we also need to ensure that the token is blacklisted so that it cannot be used again, so we can store the token in a blacklist collection in the database.
    // WIP: Blacklist token
    return { message: 'Logout successful' };
};

module.exports = {
    signup,
    login,
    logout
};