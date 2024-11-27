const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Resource = sequelize.define("resources", {
    resourceUrl: { type: DataTypes.TEXT, allowNull: false },
    expirationTime: { type: DataTypes.DATE, allowNull: false }, // passed in seconds, stored in date
    status: { type: DataTypes.ENUM("active", "expired"), defaultValue: "active" },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } }
}, { timestamps: true });

Resource.belongsTo(User, { foreignKey: "userId" });
module.exports = Resource;
