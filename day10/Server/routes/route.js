const express = require("express");
const bodyParser = require('body-parser');
const {Usermodel}  = require('../model/model');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  mongoose = require('mongoose');
const verifyToken = require("../middlewares/veriifyToken");


router.get('/protected-route', verifyToken, (req, res) => {
  // Access the authenticated user through req.user

  res.send({ message: 'Access granted', user: req.user });
});

//for frontend to display a register user 
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
                  `<tr><td>${user.username}</td><td>${user.email}</td> </tr> `
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



router.post('/register' , async(req,res) =>{
    const{username,email,password} =req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // const newUser = new Usermodel({username,email,password:hashedPassword});
        // await Usermodel.create(newUser);
        const newUser = await Usermodel.create({username, email, password: hashedPassword});

        let token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email
            },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
        newUser.tokens = newUser.tokens.concat({token});
        await newUser.save();
        res.json({ success: true, message: 'User registered successfully' , token:token });
        
    } catch (error) {
        console.log(error)
        res.redirect('/register');
        return next(error);
    }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Usermodel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send('User not registered');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).send('Password incorrect');
    }

    let token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '30d' });

    res.status(200).json({ token, message: 'Login successful' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  
  res
      .status(200)
      .json({
          success: true,
          data: {
              userId: existingUser.id,
              email: existingUser.email,
              token: token,
          },
      });

});




module.exports = router;