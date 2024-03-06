const db = require("../config/dbConfig");
const dbUtils = require("../utils/dbUtils");
let globalData = [];

const customers = async (req, res, next) => {
  if (req.user.user_role !== "Admin") {
    const err = {
      status: 400,
      message: "Only Admin allowed for this request",
    };
    return next(err);
  }

  globalData = [];

  const userId = req.user.user_id;
  const product_id = await dbUtils.getProductId(userId);

  for (const element of product_id) {
    const data = await dbUtils.getCartData(element.product_id);
    for (const productData of data) {
      const UserData = await dbUtils.getCustomerInfo(productData.user_id);
      globalData.push({
        product_name: productData.product_name,
        product_quantity: productData.quantity,
        status: productData.status,
        user_name: UserData[0].user_name,
        email: UserData[0].email,
      });
    }
  }

  return res.json({
    status: "success",
    message: "Data fetched succesfully",
    data: globalData,
  });
};

module.exports = { customers, globalData };
