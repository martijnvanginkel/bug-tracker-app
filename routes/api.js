const express = require('express');
const router = express.Router();
const ProjectController = require('./../controllers/ProjectController');
const TaskController = require('./../controllers/TaskController');

router.get('/projects', ProjectController.getProjects);
router.get('/projects/:id', ProjectController.showProject);
router.post('/projects/new', ProjectController.newProject);

router.put('/tasks/shuffle/:id', TaskController.shuffleTask);


module.exports = router;