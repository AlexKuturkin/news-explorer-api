const logoutRouter = require('express').Router();

const { logout } = require('../controllers/users');

logoutRouter.post('/', logout);

module.exports = logoutRouter;