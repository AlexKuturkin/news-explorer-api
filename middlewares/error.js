const { errorServer } = require('../constants/error-messages');

const errorMiddleware = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (res.headersSent) {
    return next(err);
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorServer
        : message,
    });
  return true;
};

module.exports = errorMiddleware;
