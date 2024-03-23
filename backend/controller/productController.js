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
  let ids;
  let singleUserProductsData = [];

  const products = await dbUtils.getSingleUserProducts(id);

  for (const product of products) {
    const cartProducts = await dbUtils.checkCartTable(product.product_id);
    let quantity = 0;

    ids = product.product_id;

    for (const cartProduct of cartProducts) {
      if (ids === cartProduct.product_id) {
        quantity = parseInt(cartProduct.quantity) + parseInt(quantity);
      }
    }

    if (cartProducts.length === 0) {
      singleUserProductsData.push({
        ...product,
        cart_quantity: 0,
        available_quantity: parseInt(product.quantity),
      });
    } else {
      singleUserProductsData.push({
        ...product,
        cart_quantity: quantity,
        available_quantity: parseInt(product.quantity) - quantity,
      });
    }
  }

  return res.json({
    status: "success",
    message: "Your products",
    data: singleUserProductsData,
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
      message: "You have changed nothing in data",
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
