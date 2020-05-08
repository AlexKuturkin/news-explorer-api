const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const LoginError = require('../errors/loginError');
const { errorAuthorization } = require('../constants/error-messages');

module.exports.auth = (req, res, next) => {
  /* res.set('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.set('Access-Control-Allow-Credentials', 'true') */

  const { jwt: token } = req.cookies;

  if (!token) {
    throw new LoginError(errorAuthorization);
  }

  // const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new LoginError(errorAuthorization);
  }
  req.user = payload;
  next();
};
