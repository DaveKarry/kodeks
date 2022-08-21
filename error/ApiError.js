const { logError} = require('../controllers/logger');

class ApiError extends Error{
  constructor(status, message){
    super();
    this.status = status;
    this.message = message;
  }


  static badRequest(message, data){
    const status = 400;
    data.status = status;
    data.message = message;
    logError(data);
    return new ApiError(status, message);
  }

  static internal(message, data){
    const status = 500;
    data.status = status;
    data.message = message;
    logError(data);
    return new ApiError(500, message);
  }

  static forbidden(message, data){
    const status = 403;
    data.status = status;
    data.message = message;
    logError(data);
    return new ApiError(403, message);
  }
  static notFound(message, data){
    const status = 404;
    data.status = status;
    data.message = message;
    logError(data);
    return new ApiError(404, message);
  }
}

module.exports = ApiError;