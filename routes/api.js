const express = require('express');
const router = express.Router();
const ProjectController = require('./../controllers/ProjectController');
const TaskController = require('./../controllers/TaskController');
const auth_middleware = require('./../middleware/auth_middleware');

router.get('/projects', auth_middleware.isAuthorized, ProjectController.getProjects);
router.get('/projects/:id', auth_middleware.isAuthorized, ProjectController.showProject);
router.post('/projects/new', auth_middleware.isAuthorized, ProjectController.newProject);
router.post('/projects/invite/:id', auth_middleware.isAuthorized, ProjectController.inviteUser);
router.delete('/projects/leave/:id', auth_middleware.isAuthorized, ProjectController.leaveProject);

// router.put('/tasks/shuffle/:id', TaskController.shuffleTask);
router.post('/tasks/new', TaskController.newTask);
router.put('/tasks/move/:id', TaskController.moveTask);
router.put('/tasks/edit/:id', TaskController.editTask);
router.delete('/tasks/remove/:id', TaskController.removeTask);


module.exports = router;