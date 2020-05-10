const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    nickname: Joi.string()
      .min(4)
      .max(30)
      .required()
      .messages({
        'string.base': 'Le pseudo doit être une chaîne de caractères',
        'string.min': 'Le pseudo doit contenir 4 caractères au minimum !',
        'string.max': 'Le pseudo doit contenir 30 caractères au maximum !'
      }),
    password: Joi.string()
      .min(5)
      .max(999)
      .required()
      .messages({
        'string.base': 'Le mot-de-passe doit être une chaîne de caractères',
        'string.min': 'Le mot-de-passe doit contenir 5 caractères au minimum !',
        'string.max': 'Le mot-de-passe doit contenir 999 caractères au maximum !'
      }),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    nickname: Joi.string()
      .min(4)
      .max(30)
      .required()
      .messages({
        'string.base': 'Le pseudo doit être une chaîne de caractères',
        'string.min': 'Le pseudo doit contenir 4 caractères au minimum !',
        'string.max': 'Le pseudo doit contenir 30 caractères au maximum !'
      }),
    password: Joi.string()
      .min(5)
      .max(999)
      .required()
      .messages({
        'string.base': 'Le mot-de-passe doit être une chaîne de caractères',
        'string.min': 'Le mot-de-passe doit contenir 5 caractères au minimum !',
        'string.max': 'Le mot-de-passe doit contenir 999 caractères au maximum !'
      }),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;