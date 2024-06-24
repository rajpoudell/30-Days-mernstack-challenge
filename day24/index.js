const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://razpoudel7:razpoudel7razpoudel7@cluster0.l4djaub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose Schema and Model
const testSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const TestModel = mongoose.model('TestCollection', testSchema);

// Simple GET route
app.get('/', (req, res) => {
    res.send("Hello world!");
});

// POST route to add a new document
app.post('/add', async (req, res) => {
    const { name, email, age } = req.body;

    const newDocument = new TestModel({ name, email, age });

    try {
        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error saving document', error });
    }
});

// GET route to retrieve all documents
app.get('/documents', async (req, res) => {
    try {
        const documents = await TestModel.find({});
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving documents', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
