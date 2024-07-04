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
app.use('/api/admin', require('./routes/admin'));
app.use('/api/lecturer', require('./routes/lecturer'));
app.use('/api/resource', require('./routes/resource'));
app.use('/api/course', require('./routes/course'));
app.use('/api/student', require('./routes/student'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
