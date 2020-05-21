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

    console.log(req.body.priority)

    const project = await Project.aggregate([

        { $match: { _id: mongoose.Types.ObjectId(req.params.project_id) }},
        { $unwind: '$tasks'},
        { $facet: {
            'state_update': [
                { $match: { 'tasks._id': mongoose.Types.ObjectId(req.params.task_id)} },
                { $project: { _id: 0, tasks: 1 } }
            ],
            'priority_updates': [
                { $match: { 'tasks.priority': { $gt: 6 } } },
                { $project: { _id: 0, 'priority': '$tasks.priority' } },
            ] 
        } }

    ]);

    // project[0].priority_updates.forEach((update) => {
    //     console.log(update);
    //     update.priority += 1;
    // });

    const new_project = project[0];
    


    // const new_project 


    console.log(new_project)

    await new_project.save();
    // const task = {
    //     description: req.body.description,
    //     state: TaskState.DOING,
    //     priority: project.tasks.length
    // }
    // project.tasks.push(task);
    // await project.save();
    res.json(new_project);
});

router.get('/', async (req, res) => {
    const projects = await Project.find().catch((error) => res.json({ message: error.message }));
    res.json(projects);
});

router.get('/:id', async (req, res) => {

    const project = await Project.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) }},
        { $unwind: '$tasks'},
        { $sort: { 'tasks.priority': 1 } },
        { $group: { _id: '$_id', name: { $first: '$name' }, 'tasks': { $push: '$tasks'}} },
    ]).catch((error) => res.json({ message: error.message }));

    /* Return the first item cause aggregate always returns array */
    res.json(project[0]);
});

module.exports = router;
