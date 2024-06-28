// routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Route to view user profiles
router.get('/users', auth, adminController.viewUsers);

// Route to add a new user
router.post('/users', auth, adminController.addUser);

// Route to update a user
router.put('/users/:id', auth, adminController.updateUser);

// Route to delete a user
router.delete('/users/:id', auth, adminController.deleteUser);

module.exports = router;
