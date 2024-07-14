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

async function showRegisterUser(req, res) {
  try {
    const users = await Usermodel.find({}, "username email");
    const userArray = users.map(({ username, email }) => ({ username, email }));
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
}

async function register(req, res) {
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
        files: {
          filename: file.filename,
          path: file.path,
        },
      });
      await newUser.save();
      console.log(req.body);
      console.log(file);
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET || "secretkeyappearshere",
        { expiresIn: "1h" }
      );

      // Email options
      const mailOptions = {
        from: "kingsniper202030@gmail.com",
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
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function login(req, res) {
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
}

async function allProducts(req, res) {
  try {
    const products = await ProductModel.find({});
    res.send(products);
  } catch (error) {
    console.error(error);
  }
}

async function SingleProductWithId(req, res) {
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
}

async function createNewProduct(req, res) {
  try {
    const { title, price, description, category, rating } = req.body;
    const file = req.file;

    console.log("Creating new product with data:", {
      title,
      price,
      description,
      category,
      rating,
    });

    // Ensure all required fields are provided
    if (
      !title ||
      !price ||
      !description ||
      !category ||
      !req.user ||
      !req.user.userId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure req.file exists
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newProduct = new ProductModel({
      title,
      price,
      description,
      category,
      rating: {
        rate: rating?.rate || 0,
        count: rating?.count || 0,
      },
      files: {
        filename: file.filename,
        path: file.path,
      },
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

async function userProfileDetails(req, res) {
  try {
    const email = req.user.email;
    const user = await Usermodel.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    } else {
      // Send user data except for sensitive fields
      const { password, ...userData } = user.toObject();
      return res.status(200).send(userData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function userProduct(req, res) {
  try {
    const { userId } = req.user;
    console.log("User ID:", userId);

    const products = await ProductModel.find({ user: userId });
    console.log(products);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products " });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

async function deleteProductByUser(req, res) {
  try {
    const { id } = req.params;
    const user = await ProductModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting Product" });
  }
}

async function editProductByUser(req, res) {
  try {
    const { userId } = req.user;
    const { productid } = req.params;
    const { title, price, description, category } = req.body;
    const file = req.file;

    console.log("User Id:", userId);
    console.log("Product Id:", productid);

    // Ensure the productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Prepare the updated product data
    const updatedProductData = {
      title,
      price,
      description,
      category,
    };

    // Include file information if available
    if (file) {
      updatedProductData.files = {
        filename: file.filename,
        path: file.path,
      };
    }

    // Find and update the product
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productid, user: userId },
      { $set: updatedProductData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .send({ message: "Product not found or unauthorized access" });
    }

    console.log("After edit:", updatedProduct);
    res
      .status(200)
      .send({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Error updating product" });
  }
}

async function testing(req, res) {}
module.exports = {
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
};
