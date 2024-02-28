const dbUtils = require("../utils/dbUtils");
const bcryptUtils = require("../utils/bcryptUtils");
const jwtUtils = require("../utils/jwtUtils");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await dbUtils.getUser("email", email);
  // console.log(email);
  if (user.length === 0) {
    const err = {
      status: 401,
      message: "User not exist",
    };
    return next(err);
  }
  const match = await bcryptUtils.compareString(user[0].password, password);
  // console.log(match);
  const accessTokenParams = {
    payload: {
      user_id: user[0].user_id,
    },
    secretKey: process.env.ACCESS_TOKEN,
    expiresIn: "1d",
  };
  const refreshTokenParams = {
    payload: {
      user_id: user[0].user_id,
    },
    secretKey: process.env.REFRESH_TOKEN,
    expiresIn: "1d",
  };
  if (match) {
    const accessToken = jwtUtils.createToken(accessTokenParams);
    const refreshToken = jwtUtils.createToken(refreshTokenParams);
    const updateRefreshToken = await dbUtils.updateRefreshToken(
      refreshToken,
      user[0].user_id
    );
    if (updateRefreshToken === "success") {
      res.cookie("rt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("at", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({
        status: "success",
        message: "LoggedIn successfully",
        data: { user, accessToken },
      });
    } else {
      const err = {
        message: "Error in updating update refreshing token",
      };
      return next(err);
    }
  } else {
    const err = {
      status: 401,
      message: "Please enter correct password",
    };
    return next(err);
  }
};

module.exports = login;
