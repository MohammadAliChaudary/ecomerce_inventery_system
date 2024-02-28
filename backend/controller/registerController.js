const db = require("../config/dbConfig");
const dbUtils = require("../utils/dbUtils");
const bcryptUtils = require("../utils/bcryptUtils");
const register = async (req, res, next) => {
  const { user_name, user_role, email, password } = req.body;
  const isUserExist = await dbUtils.checkForDuplicateUser("email", email);

  if (isUserExist) {
    const err = {
      status: 409,
      message: "User already exist.Try another email",
    };
    return next(err);
  }
  const hashpwd = await bcryptUtils.hashedString(password, 10);
  const values = [user_name, user_role, email, hashpwd];
  const query =
    "INSERT INTO user (`user_name`,`user_role`,`email`,`password`) values(?,?,?,?)";
  db.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: "New account created",
        data: result,
      });
    }
  });
};
module.exports = register;
