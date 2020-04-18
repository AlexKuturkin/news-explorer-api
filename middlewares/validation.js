const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const BadRequest = require('../errors/notFoundError');
const {
  registrationUserNameError,
  registrationUserEmailError,
  registrationUserPassError,
  authorizationFailedPassOrEmail,
  authorizationFailedCookies,
  keywordFailed,
  titleFailed,
  textFailed,
  dateFailed,
  sourceFailed,
  linkFailed,
  imageFailed,
  articleIdFailed,
} = require('../constants/error-messages');

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .error(new BadRequest(registrationUserNameError)),
    email: Joi.string()
      .required()
      .email()
      .error(new BadRequest(registrationUserEmailError)),
    password: Joi.string()
      .required()
      .min(10)
      .error(new BadRequest(registrationUserPassError)),
  }),
});

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .error(new BadRequest(authorizationFailedPassOrEmail)),
    password: Joi.string()
      .required()
      .min(10)
      .error(new BadRequest(authorizationFailedPassOrEmail)),
  }),
});

const authValidation = celebrate({
  cookies: Joi.object()
    .keys({
      jwt: Joi.string().required(),
    })
    .unknown()
    .error(new BadRequest(authorizationFailedCookies)),
});

const articlePostValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string()
      .required()
      .error(new BadRequest(keywordFailed)),
    title: Joi.string()
      .required()
      .error(new BadRequest(titleFailed)),
    text: Joi.string()
      .required()
      .error(new BadRequest(textFailed)),
    date: Joi.string()
      .required()
      .error(new BadRequest(dateFailed)),
    source: Joi.string()
      .required()
      .error(new BadRequest(sourceFailed)),
    link: Joi.string()
      .required()
      .uri()
      .error(new BadRequest(linkFailed)),
    image: Joi.string()
      .required()
      .uri()
      .error(new BadRequest(imageFailed)),
  }),
});

const articleIdValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId()
      .required()
      .error(new BadRequest(articleIdFailed)),
  }),
});

module.exports = {
  signUpValidation,
  signInValidation,
  authValidation,
  articlePostValidation,
  articleIdValidation,
};
