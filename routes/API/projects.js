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
                { $match: { 'tasks._id': mongoose.Types.ObjectId(req.params.task_id)} }
            ],
            'priority_updates': [
                { $match: { 'tasks.priority': {$gt: 6}} }
            ]
        } },
        //  $facet: {
        //     [
        //         { $group }
        //     ]

        // } 

        // { $group: { _id:  mongoose.Types.ObjectId(req.params.task_id)}   }
        
       
        // { $match: {'tasks._id': mongoose.Types.ObjectId(req.params.task_id)}},
        // { $group: { _id: '$tasks._id',  'tasks': [] } }
    ]);

    // { $group: { _id: '$_id', name: { $first: '$name' }, 'tasks': { $push: '$tasks'}} },

    console.log(req.params.task_id)

    // { 'tasks.priority': {$gt: 6}}
    console.log(project)

    // vind de task met de task_id die
    



    // console.log(project)
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
