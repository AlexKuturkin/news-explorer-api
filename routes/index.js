const routerApp = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const autorizationRouter = require('./autorization');
const logoutRouter = require('./logout');
const auth = require('../middlewares/auth');
const { authValidation } = require('../middlewares/validation');

const NotFoundError = require('../errors/notFoundError');
const { resourseNotFound } = require('../constants/error-messages');

routerApp.use(autorizationRouter);

routerApp.use('/users', authValidation, auth, usersRouter);
routerApp.use('/articles', authValidation, auth, articlesRouter);
routerApp.use('/logout', logoutRouter);

routerApp.use('/', (req, res, next) => {
  next(new NotFoundError(resourseNotFound));
});

module.exports = routerApp;
