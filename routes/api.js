const express = require('express');
const router = express.Router();
const ProjectController = require('./../controllers/ProjectController');
const TaskController = require('./../controllers/TaskController');



const verifyToken = (req, res, next) => {
    // get auth header value
    console.log('verify token')
    const bearer_header = req.headers['authorization'];

    if (bearer_header === undefined) {
        res.json({ message: 'header not found' });
    }

    const bearer = bearer_header.split(' ');
    const token = bearer[1];
    req.token = token;

    console.log(token)
    next();


}

router.get('/projects', ProjectController.getProjects);
router.get('/projects/:id', ProjectController.showProject);
router.post('/projects/new', ProjectController.newProject);

router.put('/tasks/shuffle/:id', TaskController.shuffleTask);


module.exports = router;