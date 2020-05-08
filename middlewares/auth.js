const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const LoginError = require('../errors/loginError');
const { errorAuthorization } = require('../constants/error-messages');

module.exports = (req, res, next) => {
  if (!req.headers || !req.headers.startsWith('Bearer ')) {
    throw new LoginError(errorAuthorization);
  }
  const token = req.headers.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new LoginError(errorAuthorization);
  }
  req.user = payload;
  next();
};
