const db = require("../config/dbConfig");

const checkForDuplicateUser = (columnName, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE ${columnName} = ?`;
    db.query(query, value, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result.length > 0);
      }
    });
  });
};

const getUser = (columnName, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE ${columnName} = ?`;
    db.query(query, value, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const updateRefreshToken = (refresh_token, user_id) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE user SET refresh_token = ? WHERE user_id = ?";
    db.query(query, [refresh_token, user_id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve("success");
      }
    });
  });
};

module.exports = {
  checkForDuplicateUser,
  getUser,
  updateRefreshToken,
};
