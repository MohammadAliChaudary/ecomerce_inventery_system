const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `email should be a type of text`,
    "string.empty": `email cannot be an empty field`,
    "string.email": `email must be a valid email address`,
    "any.required": `email is a required field`,
  }),
  password: Joi.string().required().messages({
    "any.required": `password is a required field`,
  }),
});

module.exports = { authSchema };
