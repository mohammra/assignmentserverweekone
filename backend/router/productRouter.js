"use strict";
// productRoutes
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { body } = require("express-validator");
const productController = require("../controllers/productController");

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ dest: "uploads/", fileFilter });

router
  .get("/", productController.getProducts)
  .get("/:productId", productController.getProduct)
  .post(
    "/",
    upload.single("product"),
    body("name").isLength({ min: 2 }).trim().escape(),
    body("posting_date").isDate(),
    body("details").isLength({ min: 2 }).trim().escape(),
    productController.createProduct
  )
  .put(
    "/",
    body("name").isLength({ min: 2 }).trim().escape(),
    body("posting_date").isDate(),
    body("details").isLength({ min: 2 }).trim().escape(),
    productController.modifyProduct
  )
  .put(
    "/:productId",
    body("name").isLength({ min: 2 }).trim().escape(),
    body("posting_date").isDate(),
    body("details").isLength({ min: 2 }).trim().escape(),
    productController.modifyProduct
  )
  .delete("/:productId", productController.deleteProduct);

module.exports = router;
