const express = require("express");
const router = express.Router();
const controller = require("../controller/paymentController");
const schema = require("../schema/creditCardSchema");
const schemaValidation = require("../middleware/joiValidator");

router.post(
  "/",
  schemaValidation(schema.creditCardSchema),
  controller.PaymentController
);

module.exports = router;
