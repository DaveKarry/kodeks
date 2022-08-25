const jwt = require('jsonwebtoken');
const {
  createLogger,
  transports,
  format: {
    combine,
    timestamp,
    json
  } } = require('winston');


const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'logs/logs.log',
      level: 'info',
      format: combine(timestamp(), json())
    }),
    new transports.File({
      filename: 'logs/err.log',
      level: 'error',
      format: combine(timestamp(), json())
    })
  ]
});

function logError(data) {
  logger.log('error', `login - ${data.login}, ip - ${data.ip}, request - ${data.method}: ${data.request}, status - ${data.status}, message - ${data.message}`);
}

function logSuccess(data) {
  logger.log('info', `login - ${data.login}, ip - ${data.ip}, request - ${data.method}: ${data.request}, status - 200`);
}

function createDatalog(req){
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const token = req?.headers?.authorization?.split(' ')[1];
  const {method} = req;
  let decode;
  if (token){
    decode = jwt.verify(token, process.env.SECRET_KEY);
  }
  const login = decode?.login || req?.body?.login;
  
  return {
    ip,
    login,
    method,
    request: req.originalUrl
  };
}

module.exports = {logError, logSuccess, createDatalog};