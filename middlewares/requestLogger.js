// middlewares/requestLogger.js
function requestLogger(req, res, next) {
    console.log('Solicitud recibida:', req.method, req.url, req.body);
    next();
  }
  
  module.exports = requestLogger;
  