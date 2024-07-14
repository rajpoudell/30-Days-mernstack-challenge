const express = require("express");
const bodyParser = require("body-parser");
const Usermodel = require("../model/model");
const ProductModel = require("../model/product");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const verifyTokenAndRole = require("../middlewares/veriifyToken");
const nodemailer = require("nodemailer");
const { productUpload, userUpload } = require('../middlewares/uploadHandle');

const {
  showRegisterUser,
  register,
  login,
  allProducts,
  SingleProductWithId,
  createNewProduct,
  userProfileDetails,
  userProduct,
  deleteProductByUser,
  editProductByUser,
} = require("../controller/admincontroller");

router.get("/admin", verifyTokenAndRole("admin"), (req, res) => {
  res.send("Welcome, Admin!");
});

router.get("/user", verifyTokenAndRole("user"), (req, res) => {
  res.send("Welcome, User!");
});

router.get("/registereduser", showRegisterUser);

router.post("/register", userUpload.single("files"), register);

router.post("/login", login);

router.get("/products", allProducts);

router.get("/products/:pid", SingleProductWithId);

//create-product
router.post(
  "/create-products",
  verifyTokenAndRole("admin"),
  productUpload.single('files'),
  createNewProduct
);

//fetch user details
router.get(
  "/profile/:userId",
  verifyTokenAndRole(["user", "admin"]),
  userProfileDetails
);


router.get(
  "/api/allproducts",
  verifyTokenAndRole("admin"),
  userProduct
);

router.delete(
  "/delete/:id",
  verifyTokenAndRole("admin"),
  deleteProductByUser
);
router.put(
  "/update/:productid",
  verifyTokenAndRole("admin"),
  editProductByUser
);

module.exports = router;
