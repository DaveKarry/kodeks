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
  logger.log('error', `login - ${data.login}, ip - ${data.ip}, request - ${data.request}, status - ${data.status}, message - ${data.message}`);
}

function logSuccess(data) {
  logger.log('info', `login - ${data.login}, ip - ${data.ip}, request - ${data.request}, status - 200`);
}

module.exports = {logError, logSuccess};