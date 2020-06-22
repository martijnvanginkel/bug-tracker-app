const express = require('express');
const router = express.Router();
const ProjectController = require('./../controllers/ProjectController');
const TaskController = require('./../controllers/TaskController');
const auth_middleware = require('./../middleware/auth_middleware');

router.get('/projects', auth_middleware.isAuthorized, ProjectController.getProjects);
router.get('/projects/:id', ProjectController.showProject);
router.post('/projects/new', ProjectController.newProject);

// router.put('/tasks/shuffle/:id', TaskController.shuffleTask);
router.put('/tasks/move/:id', TaskController.moveTask);
router.put('/tasks/edit/:id', TaskController.editTask);
router.delete('/tasks/remove/:id', TaskController.removeTask);


module.exports = router;