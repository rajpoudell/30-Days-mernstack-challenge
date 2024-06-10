const express = require("express");
const mongoose = require("mongoose");
const Usermodel = require("../model/model");
const router = express.Router();
const multer = require("multer");
const upload = require("../middleware/uploadHandle");

router.get("/", (req, res) => {
  res.send({ message: "connection established on " });
});

router.post("/profile", function (req, res) {
  console.log(req.body);
  res.send("Successfully uploaded");
});

//route for getting user_data from user
router.post("/register", upload.single("files"), async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const file = req.file;
  try {
    const newUser = await Usermodel.create({
         firstName, 
         lastName,
          email ,
        files:{
            filename:file.filename,
            path:file.path
        }
    });
    await newUser.save;
    console.log(req.body);
    console.log(file);
    res.send({ message: "User registered successfully" });
  } catch (error) { 
    console.log(error);
    res.status(500).send({ message: "User registration failed" });
  }
});
router.get('/details', async (req, res) => {
  try {
      const users = await Usermodel.find({});
      res.send(users);
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server Error" });
  }
});
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Usermodel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting user" });
  }
});
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const file = req.file;
    const updatedUserData = {
      firstName,
      lastName,
      email
    };
    if (file) {
      updatedUserData.files = {
        filename: file.filename,
        path: file.path
      };
    }
    const updatedUser = await Usermodel.findByIdAndUpdate(id, 
      updatedUserData,
       { new: true });
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating user" });
  }
});


module.exports = router;
