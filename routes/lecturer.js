// routes/lecturer.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lecturerController = require('../controllers/lecturerController');

// Route to update lecturer profile
router.put('/profile', auth, lecturerController.updateProfile);

module.exports = router;
