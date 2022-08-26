require('dotenv').config();
require('dotenv-defaults').config();

module.exports = {
  servers:[
    {
      url:`http://localhost:${process.env.APP_PORT}`,
      description:'Local server'
    }
  ]
};