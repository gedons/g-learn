// server.js
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// Connect to database
connectDB();

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
// Add other routes here for admin, lecturer, student

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
