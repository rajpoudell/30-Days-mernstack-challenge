const express = require("express");
const { Usermodel } = require('../models/usermodel');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello world") 

});

router.post('/users', async (req, res) => {
    try {
        const { firstname, lastname, password, phonenumber, company, email } = req.body;

        // Create a new user instance
        const newUser = new Usermodel({
            firstname,
            lastname,
            password,
            phonenumber,
            company,
            email
        });

        // Save the user to the database
        await newUser.save();

        // Respond with the created user
        res.status(201).json(newUser);
    } catch (error) {
        // Handle potential errors
        if (error.name === 'ValidationError') {
            // If validation error, send bad request status
            res.status(400).json({ error: error.message });
        } else if (error.code === 11000) {
            // If duplicate key error (for unique fields like email)
            res.status(409).json({ error: 'Email already exists' });
        } else {
            // For any other errors, send internal server error status
            res.status(500).json({ error: 'An error occurred while creating the user' });
        }
    }
});
module.exports = router;