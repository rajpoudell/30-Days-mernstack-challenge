const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/verifyToken");
const userModel = require("../models/usermodel");
const taskModel = require("../models/taskmodel");

const router = express.Router();

router.get("/",async (req, res) => {
  try {
    res.send("hello from server:")

  } catch (error) {
   console.log(error); 
  }
});


router.post("/register", async (req, res) => {
  try {
    const { username, password,email, role} = req.body;

    const existingUser = await userModel.findOne({ username });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await userModel.create({
      username:username,
      password: hashedPassword,
      role,
      email:email,
      tokens: [],
    });
    console.log(newUser);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
    // res.redirect("/register");
  }
});


router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      // Find user by username
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, 'secret');
      user.tokens.push(token);
      await user.save();
      res.json({ token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/tasks', async (req, res) => {
    try {
        const users = await taskModel.find({});
        res.send(users);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.get('/user/task',verifyToken, async (req, res) => {
    try {
        // Extract user ID from request query parameters
        const { userId } = req.user;

        // Fetch tasks created by the specified user
        const tasks = await taskModel.find({ createdBy: userId });

        // Respond with the tasks
        res.send(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

  router.post('/api/task',  verifyToken,async (req, res) => {
    try {
      const { title, description } = req.body;

      const createdBy = req.user.userId; // User ID from JWT token
      console.log(createdBy);
      const newTask = new taskModel({ title, description, createdBy });
      await newTask.save();
      res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;
