const express = require("express");
const router = express.Router();
const register = require("../api/register");
const auth = require("../api/auth");
const refresh = require("../api/refresh");
const logout = require("../api/logout");

router.use("/register", register);
router.use("/auth", auth);
router.use("/refresh", refresh);
router.use("/logout", logout);

module.exports = router;
