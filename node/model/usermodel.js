const Sequelize = require("sequelize");
const sequelize = require("../config/server");
const Product = require("./productsmodel");

const User = sequelize.define("nika'sUser", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    },
    password: {
        type : Sequelize.STRING,
        allowNull:false
    }
});

User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });
module.exports = User;