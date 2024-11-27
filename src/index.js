const express = require("express");
const bodyParser = require("body-parser");
const resourceRoutes = require("./routes/resourceRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/auth");
const sequelize = require("./config/db");
require("dotenv").config();

// Sync database
(async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
})();

const app = express();
app.use(bodyParser.json());

// Cron Job to update expired items
require('./jobs/cronUpdateResource');

// Routes
app.use('/auth', authRoutes);
app.use("/resources", authMiddleware, resourceRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));