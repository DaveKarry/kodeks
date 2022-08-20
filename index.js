const express = require('express');
const sequelize = require('./database/initdb');
const app = express();
require('dotenv').config();
require('dotenv-defaults').config();


async function main() {
  await app.listen(Number(process.env.APP_PORT));
  console.log(`Сервер открыт на http://localhost:${process.env.APP_PORT}/`);
  try {
    await sequelize.authenticate();
    console.log('Соединение с БД открыто...');
  } catch (error) {
    console.error('Непредвиденная ошибка:', error);
  }
}

main().catch(err => console.error(err));
