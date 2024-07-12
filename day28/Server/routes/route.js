const express = require("express");
const bodyParser = require("body-parser");
const Usermodel = require("../model/model.js");
const ProductModel = require("../model/product");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const verifyTokenAndRole = require("../middlewares/veriifyToken");
const nodemailer = require("nodemailer");
const upload = require("../middlewares/uploadHandle");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kingsniper202030@gmail.com",
    pass: "vnqtcagduwipanrs",
  },
});

router.get("/registereduser",  async (req, res) => {
  try {
    const users = await Usermodel.find({}, "username email"); // Adjust fields based on your User schema

    const userArray = users.map(({ username, email }) => ({ username, email }));

    // Create an HTML table
    const tableHtml = `
        <table border="1">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            ${userArray
              .map(
                (user) =>
                  `<tr><td>${user.username}</td><td>${user.email}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      `;

    res.send(tableHtml);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/register", upload.single("files"),async (req, res) => {
  const { username, email, password, role } = req.body;
  const file = req.file;


  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Usermodel({
        username,
        email,
        password: hashedPassword,
        role,
        files:{
          filename:file.filename,
          path:file.path
      }
      });
      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET || "secretkeyappearshere",
        { expiresIn: "1h" }
      );

      // Email options
      const mailOptions = {
        // from: "kingsniper202030@gmail.com",
        to: newUser.email, // Send the email to the newly registered user
        subject: "User successfully registered",
        text: `You have successfully registered on our website. Username: ${newUser.username} Role: ${newUser.role}`,
      };

      // Send registration email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
      console.log(newUser);
      res
        .status(201)
        .json({
          success: true,
          message: "User registered successfully",
          token,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secretkeyappearshere",
      { expiresIn: "30d" }
    );

    // Respond with token
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.send(products);
  } catch (error) {
    console.error(error);
  }
});
router.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    // Check if pid is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).send({ message: "Invalid product ID" });
    }

    const product = await ProductModel.findById(pid);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send({ data: product }); // Wrap product in a data object
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

router.post(
  "/create-products",
  verifyTokenAndRole("admin"),
  async (req, res) => {
    try {
      const { title, price, description, category, image, rating } = req.body;

      console.log("Creating new product with data:", {
        title,
        price,
        description,
        category,
        image,
        rating,
      });

      const newProduct = new ProductModel({
        title,
        price,
        description,
        category,
        image,
        rating,
        user: req.user.userId,
      });

      console.log("Saving product to database...");
      await newProduct.save();

      console.log("Product created successfully");
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      console.error("Error creating product:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

router.get("/admin", verifyTokenAndRole("admin"), (req, res) => {
  res.send("Welcome, Admin!");
});

router.get("/user", verifyTokenAndRole("user"), (req, res) => {
  res.send("Welcome, User!");
});


router.get("/profile/:userId", verifyTokenAndRole("admin") || verifyTokenAndRole("user"), async (req, res) => {
  try {
    // Assume email is extracted from the token by your authentication middleware
    const email = req.user.email;
    const user = await Usermodel.findOne({ email: email });

    if (!user) {
      return res.status(404).send('User not found');
    } else {
      // Send user data except for sensitive fields
      const { password, ...userData } = user.toObject();
      return res.status(200).json(userData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
