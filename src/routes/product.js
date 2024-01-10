const express = require("express");
const { authenMiddleware } = require("../middleware/AuthenMiddleware");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.post("/create", ProductController.createProduct);
router.put("/update-product/:id",authenMiddleware, ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.get("/get-all-product", ProductController.getAllProduct);
router.get("/get-product-details/:id", ProductController.getProductDetails);
module.exports = router;
