const express = require("express");
const UserModel = require("../models/model");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("hello world!");
});
router.post("/register", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email address already exists.' });
  }

  const newUser = await UserModel.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
  await newUser.save;
  res.json({ success: true, message: 'User registered successfully' });

});
module.exports = router;
