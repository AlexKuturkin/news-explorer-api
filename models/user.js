const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const LoginError = require('../errors/loginError');
const { authorizationFailedPassOrEmail } = require('../constants/error-messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (valid) => validator.isEmail(valid),
      message: 'Почта не прошла валидацию',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 10,
  },
});

userSchema.statics.findUserByCredentials = function check(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new LoginError(authorizationFailedPassOrEmail),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new LoginError(authorizationFailedPassOrEmail),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('User', userSchema);
