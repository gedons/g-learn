// controllers/courseController.js
const Course = require('../models/course');
const Resource = require('../models/resource');

// Create a new course
exports.createCourse = async (req, res) => {
  const { title, description, resourceIds } = req.body;
  try {
    const newCourse = new Course({
      title,
      description,
      resources: resourceIds,
      lecturer: req.user.id,
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all courses for a lecturer
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ lecturer: req.user.id }).populate('resources');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single course
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('resources');
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  const { title, description, resourceIds } = req.body;
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.resources = resourceIds || course.resources;

    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    await Course.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
