const basic = require('./basic');
const servers = require('./servers');
const components = require('./components');
const api = require('./api');

module.exports = {
  ...basic,
  ...servers,
  ...components,
  ...api
};