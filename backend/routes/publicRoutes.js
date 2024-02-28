const express = require("express");
const router = express.Router();
const register = require("../api/register");
const auth = require("../api/auth");

router.use("/register", register);
router.use("/auth", auth);

module.exports = router;
