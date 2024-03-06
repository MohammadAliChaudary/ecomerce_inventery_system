const Joi = require("joi");

const creditCardSchema = Joi.object({
  name: Joi.string().min(3).required(),
  card_number: Joi.number().required(),
  expiry: Joi.string().required(),
  cvv: Joi.number().required(),
});

module.exports = { creditCardSchema };
