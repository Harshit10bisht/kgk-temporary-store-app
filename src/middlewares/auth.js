const jwt = require('jsonwebtoken');

// Middleware to verify user is still authorized to access the route
// User could be non-registererd, logged out, or token expired
module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token)
            return res.status(401).json({ message: 'Access Denied' });

        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};