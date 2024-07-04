// routes/student.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const studentController = require('../controllers/studentController');

// Route to select a course
router.post('/course/select/:id', auth, studentController.selectCourse);

// Route to mark a course as complete
router.post('/course/complete/:id', auth, studentController.markCourseComplete);

// Route to view current courses
router.get('/courses/current', auth, studentController.viewCurrentCourses);

// Route to view completed courses
router.get('/courses/completed', auth, studentController.viewCompletedCourses);

module.exports = router;
