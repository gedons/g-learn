// controllers/studentController.js
const Course = require('../models/course');
const User = require('../models/user');

// Select a course
exports.selectCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.courses.includes(req.params.id)) {
      return res.status(400).json({ msg: 'Course already selected' });
    }

    user.courses.push(req.params.id);
    await user.save();

    res.json({ msg: 'Course selected successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Mark course as complete
exports.markCourseComplete = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.courses.includes(req.params.id)) {
      return res.status(400).json({ msg: 'Course not selected' });
    }

    if (course.studentsCompleted.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Course already marked as complete' });
    }

    course.studentsCompleted.push(req.user.id);
    await course.save();

    res.json({ msg: 'Course marked as complete' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// View current courses
exports.viewCurrentCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('courses');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// View completed courses
exports.viewCompletedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ studentsCompleted: req.user.id });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
