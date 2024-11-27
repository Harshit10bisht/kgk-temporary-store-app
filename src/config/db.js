const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 18546,
    // IMP : In PROD, SSL configurations should be properly set-up
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;