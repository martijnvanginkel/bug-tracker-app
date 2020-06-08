const express = require('express');
const router = express.Router();
const ProjectController = require('./../controllers/ProjectController');

router.get('/projects', ProjectController.getProjects);
router.post('/projects/new', ProjectController.newProject);


module.exports = router;