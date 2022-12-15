"use strict";
const productModel = require("../models/productModel");
const { validationResult } = require("express-validator");
const { makeThumbnail, getCoordinates } = require("../utils/image");

const getProducts = async (req, res) => {
  const products = await productModel.getAllProducts(res);
  products.map((product) => {
    // convert posting_date date object to 'YYYY-MM-DD' string format
    product.posting_date = product.posting_date.toISOString().split("T")[0];
    return product;
  });
  res.json(products);
};

const getProduct = async (req, res) => {
  // choose only one object with matching id
  const product = await productModel.getProductById(res, req.params.productId);
  if (product) {
    // convert date object to 'YYYY-MM-DD' format
    product.posting_date = product.posting_date.toISOString().split("T")[0];
    res.json(product);
  } else {
    res.sendStatus(404);
  }
};

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  // File is empty or missing (not passing multer's fileFilter in route)
  if (!req.file) {
    res.status(400).json({ message: "file missing or invalid" });
  } else if (errors.isEmpty()) {
    const product = req.body;
    await makeThumbnail(req.file.path, req.file.filename);
    // TODO: use image.js/getCoord to extract exif-data/gps coords and add
    // to the product object as product.coords property in array format (stringified)
    product.coords = JSON.stringify(await getCoordinates(req.file.path));

    product.seller = req.user.user_id;
    product.filename = req.file.filename;
    console.log("creating a new product:", product);
    const productId = await productModel.addproduct(product, res);
    res.status(201).json({ message: "product created", productId });
  } else {
    console.log("validation errors", errors);
    res
      .status(400)
      .json({ message: "product creation failed", errors: errors.array() });
  }
};

const modifyProduct = async (req, res) => {
  const product = req.body;
  const user = req.user;
  if (req.params.productId) {
    product.product_id = req.params.productId;
  }
  //console.log('user', user, 'modifies product:', product);
  const result = await productModel.updateproductById(product, user, res);
  if (result.affectedRows > 0) {
    res.json({ message: "product modified: " + product.product_id });
  } else {
    res.status(400).json({ message: "nothing modified" });
  }
};

const deleteProduct = async (req, res) => {
  const result = await productModel.deleteproductById(
    req.params.productId,
    req.user.user_id,
    res
  );
  console.log("product deleted", result);
  // TODO: check what happens when sql query is not working?
  if (result.affectedRows > 0) {
    res.json({ message: "product deleted" });
  } else {
    res.status(401).json({ message: "product delete failed" });
  }
};

module.exports = {
  getProduct,
  getProducts,
  modifyProduct,
  createProduct,
  deleteProduct,
};
