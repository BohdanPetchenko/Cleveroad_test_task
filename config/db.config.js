const Sequelize = require("sequelize");
module.exports = new Sequelize('store', 'root', '', {
    timezone: '+03:00',
    host: 'localhost',
    dialect: 'mysql'
});