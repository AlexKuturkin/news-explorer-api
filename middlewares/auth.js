const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const LoginError = require('../errors/loginError');
const { errorAuthorization } = require('../constants/error-messages');

module.exports = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.set('Access-Control-Allow-Credentials', 'true')

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new LoginError(errorAuthorization);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new LoginError(errorAuthorization);
  }
  req.user = payload;
  next();
};
