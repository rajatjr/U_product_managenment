const Sequelize = require("sequelize");
const sequelize = require('../config/server')
const User = require('./usermodel')

const Product = sequelize.define("nika_product", {
  Product_name: {
    type: Sequelize.STRING,
  },
  Product_Price: {
    type: Sequelize.INTEGER,
  },
  Product_category: {
    type: Sequelize.STRING,
  }
}
  ,{
    timestamps: true,
    underscored: true,
    paranoid:true
  }
);


module.exports = Product;