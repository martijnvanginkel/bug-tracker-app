const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Project = require('./../../models/project');

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

// Update a task
router.put('/:project_id/task/:task_id', async (req, res) => {
    // const project = await Project.aggregate([{ "_id": req.params.project_id }, { "tasks": { $match : { state: "DOING" } } } ]);
    const project = await Project.aggregate(

        { name: 'first' }
    
    );
    
    // console.log('here')

    console.log(project)
    // const task = {
    //     description: req.body.description,
    //     state: TaskState.DOING,
    //     priority: project.tasks.length
    // }
    // project.tasks.push(task);
    // await project.save();
    res.json(project);
});

router.get('/', async (req, res) => {
    const projects = await Project.find().catch((error) => res.json({ message: error.message }));
    res.json(projects);
});

// const sortTasksByPriority = (tasks) => tasks.sort((a, b) => a.priority - b.priority);

// const filterTasksByState = (state) => (task) => task.state === state;

router.get('/:id', async (req, res) => {

    const project = await Project.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) }},
        { $unwind: '$tasks'},
        { $sort: { 'tasks.priority': 1 } },
        { $group: { _id: '$_id', name: { $first: '$name' }, 'tasks': {$push: '$tasks'}} },
    ]).catch((error) => res.json({ message: error.message }));

    res.json(project[0]);

    // const project = await Project.findById(req.params.id).catch((error) => res.json({ message: error.message }));
    // const tasks = sortTasksByPriority(project.tasks);
    // res.json({
    //     name: project.name,
    //     description: project.description,
    //     todo_tasks: tasks.filter(filterTasksByState(TaskState.TODO)),
    //     doing_tasks: tasks.filter(filterTasksByState(TaskState.DOING)),
    //     done_tasks: tasks.filter(filterTasksByState(TaskState.DONE))
    // });
});

module.exports = router;
