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

// Update a moved task
router.put('/:project_id/move_task/:task_id', async (req, res) => {

    const project = await Project.updateOne(  
        {_id: req.params.project_id},
        {
            $set: {'tasks.$[elementA].priority': req.body.new_state.priority, 'tasks.$[elementA].state': req.body.new_state.state},      
        },
        {
            arrayFilters: [
                {'elementA._id': req.params.task_id},
            ]
        }
    );

    await Project.updateOne(  
        {_id: req.params.project_id},
        {
            $inc: {'tasks.$[elementA].priority': 1, 'tasks.$[elementB].priority': -1},      
        },
        {
            arrayFilters: [
                {'elementA.state': req.body.new_state.state, 'elementA.priority': {gt: req.body.new_state.priority}},
                {'elementB.state': req.body.old_state.state, 'elementB.priority': {gt: req.body.old_state.priority}},
                
            ]
        }
    );

    res.json(project);
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
