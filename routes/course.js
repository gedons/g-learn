// routes/course.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const courseController = require('../controllers/courseController');

// Route to create a course
router.post('/', auth, courseController.createCourse);

// Route to get all courses for a lecturer
router.get('/', auth, courseController.getCourses);

// Route to get a single course
router.get('/:id', auth, courseController.getCourse);

// Route to update a course
router.put('/:id', auth, courseController.updateCourse);

// Route to delete a course
router.delete('/:id', auth, courseController.deleteCourse);

module.exports = router;
