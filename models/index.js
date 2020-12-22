const Sequelize = require("sequelize");
const sequelizeConfig = require("../config/db.config.js");

const db = {};

db.Sequelize = Sequelize;
db.sequelizeConfig = sequelizeConfig;

db.user = require("./user.model.js")(sequelizeConfig, Sequelize);
db.item = require("./item.model.js")(sequelizeConfig, Sequelize);
db.mistake = require("./mistake.model.js")(sequelizeConfig, Sequelize);

db.user.hasMany(db.item);
db.item.belongsTo(db.user);

module.exports = db;