const express = require("express");
const router = express.Router();
const controller = require("../controller/cartController");
const schema = require("../schema/addCartSchema");
const schemaValidator = require("../middleware/joiValidator");

router
  .route("/")
  .post(schemaValidator(schema.cartSchema), controller.addToCart)
  .put(controller.updateQuantity)
  .get(controller.salesAndEarningStats);

router
  .route("/:id")
  .get(controller.getCartItem)
  .delete(controller.deleteCartItem);

module.exports = router;
