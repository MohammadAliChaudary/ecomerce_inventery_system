const Joi = require("joi");
const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const registerSchema = Joi.object({
  user_name: Joi.string().min(3).max(30).required().messages({
    "string.base": `user_name should be a type of text`,
    "string.empty": `user_name cannot be an empty field`,
    "string.min": `user_name length must be at least {#limit} characters long`,
    "string.max": `user_name length must be less than or equal to {#limit} characters long`,
    "any.required": `user_name is a required field`,
  }),
  user_role: Joi.string().required().messages({
    "any.required": `user_role is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": `email should be a type of text`,
    "string.empty": `email cannot be an empty field`,
    "string.email": `email must be a valid email address`,
    "any.required": `email is a required field`,
  }),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required().messages({
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
  }),
});

module.exports = { registerSchema };
