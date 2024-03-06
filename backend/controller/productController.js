const db = require("../config/dbConfig");
const dbUtils = require("../utils/dbUtils");

const addProduct = (req, res, next) => {
  const { product_name, product_desc, quantity, price, user_id } = req.body;
  const values = [product_name, product_desc, quantity, price, user_id];
  const query =
    "INSERT INTO product (`product_name`,`product_desc`,`quantity`,`price`,`user_id`) values (?,?,?,?,?)";
  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: "New product added",
        data: result,
      });
    }
  });
};

const getSingleUserProduct = async (req, res, next) => {
  const { id } = req.params;

  const isCart = await dbUtils.checkCartTable(id);

  console.log();

  const query = "SELECT * FROM product WHERE user_id = ?";

  // console.log(product_id);
  // console.log(id);
  db.query(query, [id], (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: "Your products",
        data: result,
      });
    }
  });
};

const updateProduct = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  let query = "UPDATE product SET ";
  let first = true;
  let values = [];

  if (Object.keys(data).length === 0) {
    const err = {
      status: 500,
      message: "Please change the data to update it",
    };
    return next(err);
  }
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (!first) {
        query += ",";
      }
      query += `${key} = ?`;
      values.push(data[key]);
      first = false;
    }
  }

  query += " WHERE product_id = ?";
  values.push(id);

  db.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "succes",
        message: "Product is updated",
        data: result,
      });
    }
  });
};

const deleteProduct = (req, res, next) => {
  const { id } = req.params;
  const query = "DELETE FROM product WHERE product_id = ?";
  db.query(query, id, (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: "Product deleted successfully",
        data: result,
      });
    }
  });
};

const getAllProducts = (req, res, next) => {
  const query = "SELECt * FROM product";
  db.query(query, (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: "All products",
        data: result,
      });
    }
  });
};

module.exports = {
  addProduct,
  getSingleUserProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
