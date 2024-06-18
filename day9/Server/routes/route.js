const express = require("express");
const bodyParser = require('body-parser');
const Usermodel  = require('../model/model');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt  = require("jsonwebtoken");
const  mongoose = require('mongoose');
const verifyToken = require("../middlewares/veriifyToken");



router.get("/registereduser", async (req, res) => {
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



router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
      const existingUser = await Usermodel.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ success: false, message: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Usermodel({ username, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign(
          { userId: newUser._id, email: newUser.email },
          process.env.JWT_SECRET || 'secretkeyappearshere',
          { expiresIn: '1h' }
      );

      res.status(201).json({ success: true, message: 'User registered successfully', token });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
      const user = await Usermodel.findOne({ email });

      if (!user) {
          return res.status(401).json({ success: false, message: 'User not registered' });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
          return res.status(401).json({ success: false, message: 'Password incorrect' });
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'secretkeyappearshere',
        { expiresIn: '30d' }
      );
      console.log(token);

      res.status(200).json({ success: true, message: 'Login successful', token });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

});



module.exports = router;