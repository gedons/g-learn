// controllers/resourceController.js
const Resource = require('../models/resource');

// Create a new resource
exports.createResource = async (req, res) => {
  const { title, description, url } = req.body;
  try {
    const newResource = new Resource({
      title,
      description,
      url,
      lecturer: req.user.id,
    });

    const resource = await newResource.save();
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all resources for a lecturer
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ lecturer: req.user.id });
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single resource
exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a resource
exports.updateResource = async (req, res) => {
  const { title, description, url } = req.body;
  try {
    let resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }

    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.url = url || resource.url;

    await resource.save();
    res.json(resource);
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
    res.json({ msg: 'Resource removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
