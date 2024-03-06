const express = require("express");
const router = express.Router();
const jwtVerify = require("../middleware/jwtVerify");
const product = require("../api/product");
const cart = require("../api/cart");
const payment = require("../api/payment");
const customers = require("../api/customers");
router.use(jwtVerify.jwtVerification);

router.use("/product", product);
router.use("/cart", cart);
router.use("/payment", payment);
router.use("/customers", customers);

module.exports = router;
