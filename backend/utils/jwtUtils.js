const jwt = require("jsonwebtoken");

const createToken = (params) => {
  const token = jwt.sign(params.payload, params.secretKey, {
    expiresIn: params.expiresIn,
  });
  return token;
};
const verifyToken = (params) => {
  try {
    const payload = jwt.verify(params.token, params.secretKey);
    return payload;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createToken,
  verifyToken,
};
