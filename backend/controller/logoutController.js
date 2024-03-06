const dbUtils = require("../utils/dbUtils");
const logoutController = async (req, res, next) => {
  const { rt } = req.cookies;
  if (!rt) {
    return res.sendStatus(204);
  }
  const foundUser = await dbUtils.getUser("refresh_token", rt);
  if (foundUser.length === 0) {
    return res.sendStatus(204);
  }
  const user_id = foundUser[0].user_id;
  const refreshToken = null;
  const deleteRefreshToken = await dbUtils.updateRefreshToken(
    refreshToken,
    user_id
  );
  if (deleteRefreshToken === "success") {
    res.clearCookie("at", { httpOnly: true });
    res.clearCookie("rt", { httpOnly: true });
    return res.sendStatus(204);
  }
};
module.exports = { logoutController };
