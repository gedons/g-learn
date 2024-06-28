// routes/lecturer.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lecturerController = require('../controllers/lecturerController');

// Route to update lecturer profile
router.put('/profile', auth, lecturerController.updateProfile);

// Route to get lecturer profile
router.get('/profile', auth, lecturerController.getProfile);

// Route to answer queries
router.put('/queries/:id/answer', auth, lecturerController.answerQuery);

// Routes to manage resources
router.post('/resources', auth, lecturerController.addResource);
router.put('/resources/:id', auth, lecturerController.updateResource);
router.delete('/resources/:id', auth, lecturerController.deleteResource);

// Routes to manage courses
router.post('/courses', auth, lecturerController.addCourse);
router.put('/courses/:id', auth, lecturerController.updateCourse);
router.delete('/courses/:id', auth, lecturerController.deleteCourse);

module.exports = router;
