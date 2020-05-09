const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    nickname: Joi.string()
      .min(4)
      .max(30)
      .required(),
    password: Joi.string()
      .min(5)
      .max(999)
      .required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    nickname: Joi.string()
      .min(4)
      .required(),
    password: Joi.string()
      .min(5)
      .required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;