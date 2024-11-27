const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const User = sequelize.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
}, { timestamps: true });

User.prototype.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;