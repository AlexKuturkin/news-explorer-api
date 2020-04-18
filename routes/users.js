const usersRouter = require('express').Router();
const { getUserInformation } = require('../controllers/users');

usersRouter.get('/me', getUserInformation);

module.exports = usersRouter;
