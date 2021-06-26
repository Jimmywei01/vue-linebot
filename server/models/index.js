'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// 連線資訊
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// sequelize ＆ Sequelize 連接 DB 操作
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.motohouse = require("./motohouse")(sequelize, Sequelize);
db.motodetail = require("./motodetail")(sequelize, Sequelize);

module.exports = db;