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

router.post('/tasks/new', auth_middleware.isAuthorized, TaskController.newTask);
router.put('/tasks/move/:id', auth_middleware.isAuthorized, TaskController.moveTask);
router.put('/tasks/edit/:id', auth_middleware.isAuthorized, TaskController.editTask);
router.delete('/tasks/remove/:id', auth_middleware.isAuthorized, TaskController.removeTask);


module.exports = router;