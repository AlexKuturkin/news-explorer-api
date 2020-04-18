const mongoose = require('mongoose');
const validator = require('validator');
const { notTrueFormatLink } = require('../constants/error-messages');

const stringRequired = {
  type: String,
  required: true,
};

const urlValidator = {
  validator(valid) {
    return validator.isURL(valid);
  },
  message: notTrueFormatLink,
};

const articleSchema = new mongoose.Schema({
  keyword: stringRequired,
  title: stringRequired,
  text: stringRequired,
  date: stringRequired,
  source: stringRequired,
  link: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  image: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('Article', articleSchema);
