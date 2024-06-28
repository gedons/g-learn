// controllers/lecturerController.js
const User = require('../models/user');
const Query = require('../models/query');
const Resource = require('../models/resource');
const Course = require('../models/course');

// Update lecturer profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({ msg: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get lecturer profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Answer a query
exports.answerQuery = async (req, res) => {
  const { answer } = req.body;
  try {
    let query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ msg: 'Query not found' });
    }

    query.answer = answer;
    query.answeredBy = req.user.id;

    await query.save();

    res.json({ msg: 'Query answered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a resource
exports.addResource = async (req, res) => {
  const { title, description, link } = req.body;
  try {
    const resource = new Resource({
      title,
      description,
      link,
      createdBy: req.user.id,
    });

    await resource.save();

    res.json({ msg: 'Resource added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a resource
exports.updateResource = async (req, res) => {
  const { title, description, link } = req.body;
  try {
    let resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }

    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.link = link || resource.link;

    await resource.save();

    res.json({ msg: 'Resource updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
  try {
    let resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }

    await Resource.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Resource removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a course
exports.addCourse = async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = new Course({
      title,
      description,
      createdBy: req.user.id,
    });

    await course.save();

    res.json({ msg: 'Course added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  const { title, description } = req.body;
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    course.title = title || course.title;
    course.description = description || course.description;

    await course.save();

    res.json({ msg: 'Course updated successfully' });
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

    res.json({ msg: 'Course removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
