const sequelize = require('sequelize');
const db = new sequelize("masiting", "root", "123123123", {
    dialect: 'mysql'
});

db.sync({});
module.exports = db;