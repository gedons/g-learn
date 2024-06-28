// routes/resource.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const resourceController = require('../controllers/resourceController');

// Route to create a resource
router.post('/', auth, resourceController.createResource);

// Route to get all resources for a lecturer
router.get('/', auth, resourceController.getResources);

// Route to get a single resource
router.get('/:id', auth, resourceController.getResource);

// Route to update a resource
router.put('/:id', auth, resourceController.updateResource);

// Route to delete a resource
router.delete('/:id', auth, resourceController.deleteResource);

module.exports = router;
