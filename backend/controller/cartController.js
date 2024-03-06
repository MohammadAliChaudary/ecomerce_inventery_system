const db = require("../config/dbConfig");
const dbUtils = require("../utils/dbUtils");

const addToCart = async (req, res, next) => {
  const { product_name, product_id, product_desc, user_id, price } = req.body;
  const totalPrice = price * 1;
  const query =
    "INSERT INTO cart (`product_name`,`product_desc`,`price`,`user_id`,`product_id`,`totalPrice`) values (?,?,?,?,?,?)";
  const values = [
    product_name,
    product_desc,
    price,
    user_id,
    product_id,
    totalPrice,
  ];

  const isAlredyAdded = await dbUtils.checkForDuplicateCartProduct(
    user_id,
    product_id
  );

  const quantity = await dbUtils.getTotalQuantity(product_id);
  const quantityInCart = await dbUtils.getQuantityInCart(product_id);

  if (
    parseInt(quantity[0]?.quantity) <= parseInt(quantityInCart[0]?.quantity)
  ) {
    const err = {
      status: 400,
      message: "Sorry ! This product is out of stock",
    };
    return next(err);
  }

  if (isAlredyAdded) {
    const err = {
      status: 409,
      message: "You have already added this product to your cart",
    };
    return next(err);
  }

  db.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: "Product added to cart",
        data: result,
      });
    }
  });
};

const getCartItem = async (req, res, next) => {
  const { id } = req.params;
  const status = "Due";
  const query = "SELECT * FROM cart WHERE user_id = ? AND status = ?";
  db.query(query, [id, status], (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: "Cart products",
        data: result,
      });
    }
  });
};

const deleteCartItem = async (req, res, next) => {
  const { id } = req.params;
  const query = "DELETE FROM cart WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: " Cart item deleted",
        data: result,
      });
    }
  });
};

const salesAndEarningStats = (req, res, next) => {
  const query = "SELECT quantity,totalPrice,product_id FROM cart ";
  db.query(query, (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({ status: "success", message: "Stats", data: result });
    }
  });
};

const updateQuantity = async (req, res, next) => {
  const { id, quantity, product_id, price } = req.body;

  const totalPrice = quantity * price;

  const query = "UPDATE cart SET quantity = ?, totalPrice = ?  WHERE id = ?";

  // console.log(totalPrice);

  const totalQuantity = await dbUtils.getTotalQuantity(product_id);

  // console.log(totalQuantity[0].quantity);

  db.query(query, [quantity, totalPrice, id], async (err, result) => {
    if (err) {
      return next(err);
    } else {
      const reserveQuantity = await dbUtils.getQuantityInCart(product_id);

      let number = 0;

      reserveQuantity.forEach((element) => {
        number = number + parseInt(element.quantity);
      });

      if (number > totalQuantity[0].quantity) {
        const err = {
          status: 409,
          message: `currently available products  are limited to ${
            quantity - 1
          }`,
        };
        return next(err);
      }

      return res.json({
        status: "success",
        message: "Quantity updated",
        data: result,
      });
    }
  });
};

module.exports = {
  addToCart,
  getCartItem,
  deleteCartItem,
  updateQuantity,
  salesAndEarningStats,
};
