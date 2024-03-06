const Joi = require("joi");
const productSchema = Joi.object({
  product_name: Joi.string().min(3).max(30).required().messages({
    "string.base": `product_name should be a type of text`,
    "string.empty": `product_name cannot be an empty field`,
    "string.min": `product_name length must be at least {#limit} characters long`,
    "string.max": `product_name length must be less than or equal to {#limit} characters long`,
    "any.required": `product_name is a required field`,
  }),
  product_desc: Joi.string().max(250).required().messages({
    "string.base": `product_desc should be a type of text`,
    "string.empty": `product_desc cannot be an empty field`,
    "string.max": `product_desc length must be less than or equal to {#limit} characters long`,
    "any.required": `product_desc is a required field`,
  }),
  quantity: Joi.number().required().messages({
    "any.required": `quantity is a required field`,
  }),
  user_id: Joi.number().required().messages({
    "any.required": `user_id is a required field`,
  }),
  price: Joi.number().required().messages({
    "any.required": `price is a required field`,
  }),
});

module.exports = { productSchema };
