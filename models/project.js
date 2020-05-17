const mongoose = require('mongoose');
const Task = require('./task');

const project_schema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    non_public: {
        type: Boolean
    },
    tasks: [Task.schema]
});

module.exports = mongoose.model('Project', project_schema);