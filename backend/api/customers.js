const express = require("express");
const router = express.Router();
const controller = require("../controller/customersController");

router.route("/").get(controller.customers);

module.exports = router;
