const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const schema = require("../schema/addProductSchema");
const schemaValidator = require("../middleware/joiValidator");

router
  .route("/")
  .post(schemaValidator(schema.productSchema), productController.addProduct)
  .get(productController.getAllProducts);
router.get("/:id", productController.getSingleUserProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
