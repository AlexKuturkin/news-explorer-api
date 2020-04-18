const autorizationRouter = require('express').Router();
const {
  signUpValidation,
  signInValidation,
} = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

autorizationRouter.post('/signin', signInValidation, login);
autorizationRouter.post('/signup', signUpValidation, createUser);

module.exports = autorizationRouter;
