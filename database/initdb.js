const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/userModel');

require('dotenv').config();
require('dotenv-defaults').config();

const port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_host = process.env.DB_HOST;

const sequelize = new Sequelize(`postgres://${db_user}:${db_pass}@${db_host}:${port}/${db_name}`);

const User = UserModel(sequelize, DataTypes);


module.exports = {
  sequelize,
  User
};
