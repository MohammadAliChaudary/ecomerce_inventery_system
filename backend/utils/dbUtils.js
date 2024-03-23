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

const checkForDuplicateCartProduct = (user_id, product_id) => {
  return new Promise((resolve, reject) => {
    const status = "Due";
    const query =
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND status = ?";
    db.query(query, [user_id, product_id, status], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length > 0);
      }
    });
  });
};

const getTotalQuantity = (product_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT quantity FROM product WHERE product_id = ?";
    db.query(query, product_id, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getQuantityInCart = (product_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT quantity FROM cart WHERE product_id = ?";
    db.query(query, product_id, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getProductId = (user_id) => {
  return new Promise((resolve, reject) => {
    const getYourProductIdQuery =
      "SELECT product_id FROM product WHERE user_id = ?";
    db.query(getYourProductIdQuery, [user_id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getCartData = (product_id) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT product_name ,quantity,status,user_id FROM cart WHERE product_id = ?";
    db.query(query, [product_id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getCustomerInfo = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT user_name,email FROM user WHERE user_id = ?";
    db.query(query, [user_id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const checkCartTable = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM cart WHERE product_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getSingleUserProducts = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM product WHERE user_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = {
  checkForDuplicateUser,
  getUser,
  updateRefreshToken,
  checkForDuplicateCartProduct,
  getTotalQuantity,
  getQuantityInCart,
  getProductId,
  getCartData,
  getCustomerInfo,
  checkCartTable,
  getSingleUserProducts,
};
