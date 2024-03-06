const dbUtils = require("../utils/dbUtils");
const jwtUtils = require("../utils/jwtUtils");
const handleRefreshController = async (req, res, next) => {
  const { rt } = req.cookies;
  if (!rt) {
    const err = {
      status: 403,
      message: "Please login first",
    };
    return next(err);
  }
  const foundUser = await dbUtils.getUser("refresh_token", rt);
  if (foundUser.length === 0) {
    const err = {
      status: 403,
      message: "No user found",
    };
    return next(err);
  }
  const params = {
    token: rt,
    secretKey: process.env.REFRESH_TOKEN,
  };
  const rtPayload = jwtUtils.verifyToken(params);
  // console.log(rtPayload);
  if (rtPayload instanceof Error) {
    const err = {
      status: 401,
      message: "Refresh Token error",
    };
    return next(err);
  }
  const atParams = {
    payload: {
      user_id: foundUser[0].user_id,
    },
    secretKey: process.env.ACCESS_TOKEN,
    expiresIn: "1d",
  };
  const accessToken = jwtUtils.createToken(atParams);
  res.cookie("at", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.json({
    status: "success",
    message: "Access Token refreshed",
    data: { user: foundUser, accessToken },
  });
};
module.exports = { handleRefreshController };
