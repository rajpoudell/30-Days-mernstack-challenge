
const express = require("express");
const bodyParser = require('body-parser');
const {Usermodel}  = require('../model/model');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require("../middlewares/verifyToken");
const secretKey = 'yourSecretKey'; // Replace with your actual secret key


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
        
        const newUser = await Usermodel.create({username, email, password: hashedPassword});

        let token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email
            },
            secretKey,
            { expiresIn: "12h" }
        );
        newUser.tokens = newUser.tokens.concat({token});
        await newUser.save();
        res.json({ success: true, message: 'User registered successfully' , token:token });
        
    } catch (error) {
        console.log(error)
        res.redirect('/register');
        
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
    let token = jwt.sign({ userId: user._id,
       email: user.email },
        secretKey, 
        { 
          expiresIn: '30d' 
        });
    res.status(200).json({ token, message: 'Login successful' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  

});

// Define the route to get user profile by email from token
router.get("/:userId", verifyToken, async (req, res) => {
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

// for updating users data 
router.put("/:userId", verifyToken, async  (req, res) =>{
  try {
    const {username} = req.body;
    const updateUser = await Usermodel.findByIdAndUpdate(
      req.params.userId, 
      {username: username},
      {new:true}
    );
    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updateUser);
  } catch (error) {
    res.status(400).send("error updating user:" + error.message)
  }
})


router.put("/change-password/:userId", verifyToken, async (req, res) => {
  try {
    const user = await Usermodel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





module.exports = router;