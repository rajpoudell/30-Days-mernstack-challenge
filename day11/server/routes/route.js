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

router.get('/users', async(req, res) => {
  try {
    const users =  await Usermodel.find({},"firstName email");
    const userArray = users.map(({ firstName, email }) => ({ firstName, email }));
    // Create an HTML table
    const tableHtml = `
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr> 
          </thead>
          <tbody>
            ${userArray
              .map(
                (user) =>
                  `<tr>
                  <td>${user.firstName}</td>
                  <td>${user.email}</td> </tr> 
                  </tr> 
                  `
              )
              .join("")}
          </tbody>
        </table>
      `;

    res.send(tableHtml);
  } catch (error) {
    res.send({ message: error });
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

module.exports = router;
