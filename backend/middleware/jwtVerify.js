const jwtUtils = require("../utils/jwtUtils");
const dbUtils = require("../utils/dbUtils");
const jwtVerification = async (req, res, next) => {
  const { at } = req.cookies;
  if (!at) {
    const err = {
      status: 404,
      message: "Unauthenticated User",
    };
    return next(err);
  }
  const params = {
    token: at,
    secretKey: process.env.ACCESS_TOKEN,
  };
  const payload = jwtUtils.verifyToken(params);
  if (payload instanceof Error) {
    const err = {
      status: 403,
      message: "Session expired. Please Login again",
    };
    return next(err);
  }
  const foundUser = await dbUtils.getUser("user_id", payload.user_id);
  req.user = foundUser[0];
  next();
};

module.exports = { jwtVerification };
