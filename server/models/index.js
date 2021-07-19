const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


let sequelize = new Sequelize(config.database, config.username, config.password, config);

const Chat = require('./Chat')(sequelize,Sequelize);
const User = require("./User")(sequelize,Sequelize);

db.sequelize = sequelize;
db.DataType = Sequelize;

db.Chat = Chat
db.User = User;


module.exports = db;
