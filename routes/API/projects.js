const express = require('express');
const router = express.Router();
const Project = require('./../../models/project');

router.post('/new', async (req, res) => {
    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        non_public: req.body.non_public
    });
    await project.save().catch((error) => res.json({ message: error.message }));
    res.json(project);
});

router.get('/', async (req, res) => {
    const projects = await Project.find().catch((error) => res.json({ message: error.message }));
    res.json(projects);
});

router.get('/:id', async (req, res) => {
    const project = await Project.findById(req.params.id).catch((error) => res.json({ message: error.message }));
    res.json(project);
});

module.exports = router;
