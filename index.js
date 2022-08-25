const express = require('express');
const {sequelize} = require('./database/initdb');
const errorHandler = require('./middlware/errorHandler');
const router = require('./routers');
const formData = require('express-form-data');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');
require('dotenv').config();
require('dotenv-defaults').config();

const app = express();
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(formData.parse({ autoFields: true }));


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
