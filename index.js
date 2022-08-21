const express = require('express');
const {sequelize} = require('./database/initdb');
const errorHandler = require('./middlware/errorHandler');
const router = require('./routers');
require('dotenv').config();
require('dotenv-defaults').config();
const cors = require('cors');
const options = require('./swagger');


const app = express();
const expressSwagger = require('express-swagger-generator')(app);
app.use(cors());

expressSwagger(options);

app.use(express.json());
app.use(express.urlencoded({extended: true,}));

app.use('/api',router);
app.use(errorHandler);

async function main() {
  await app.listen(Number(process.env.APP_PORT));
  console.log(`Сервер открыт на http://localhost:${process.env.APP_PORT}/`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Соединение с БД открыто...');
  } catch (error) {
    console.error('Непредвиденная ошибка:', error);
  }
}

main().catch(err => console.error(err));
