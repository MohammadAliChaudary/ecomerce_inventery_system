const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const joiValidator = require("../middleware/joiValidator");
const schema = require("../schema/authSchema");

router.route("/").post(joiValidator(schema.authSchema), authController);

module.exports = router;
