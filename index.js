require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 9090;
const uri = process.env.MONGO_URI

// Connect to MongoDB
mongoose.connect(uri);

// Use the cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});