const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const NotFoundError = require('../errors/notFoundError');
const BadRequest = require('../errors/badRequest');
const { userDoesNotExist } = require('../constants/error-messages');

module.exports.getUserInformation = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new NotFoundError(userDoesNotExist);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (password.length > 9) {
    bcrypt
      .hash(password, 10)
      .then((hash) => User.create({
        name,
        email,
        password: hash,
      }))
      .then((newUser) => res.status(201).send({
        email: newUser.email,
        name: newUser.name,
      }))
      .catch((err) => next(new BadRequest(err.message)));
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};
