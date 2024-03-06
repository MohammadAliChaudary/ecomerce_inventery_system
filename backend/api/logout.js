const express = require("express");
const router = express.Router();
const logoutController = require("../controller/logoutController");

router.get("/", logoutController.logoutController);

module.exports = router;
