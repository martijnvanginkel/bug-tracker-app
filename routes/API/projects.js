const express = require('express');
const router = express.Router();
const Project = require('./../../models/project');
const connection = require('./../../db/connection');

const TaskState = {
    TODO: 'TODO',
    DOING: 'DOING',
    DONE: 'DONE'
}

// Create a new project
router.post('/new', async (req, res) => {
    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        non_public: req.body.non_public
    });
    await project.save().catch((error) => res.json({ message: error.message }));
    res.json(project);
});

// Create a new task
router.put('/:id/task/new', async (req, res) => {
    console.log('new task here');
    const project = await Project.findById(req.params.id);
    const task = {
        description: req.body.description,
        state: TaskState.DOING,
        priority: project.tasks.length
    }
    project.tasks.push(task);
    await project.save();
    res.json(task);
});


router.get('/', async (req, res) => {
    try {
        const projects = await connection.pool.query(`SELECT * FROM projects`);
        res.json(projects.rows);
    }
    catch (error) {
        res.status(200).json({ message: error.message });
    }
});

module.exports = router;
