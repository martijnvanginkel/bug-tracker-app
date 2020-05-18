const mongoose = require('mongoose');

const task_schema = new mongoose.Schema({
    description: {
        type: String
    },
    state: {
        type: String
    },
    priority: {
        type: Number
    }
});

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
    tasks: [task_schema]
});

module.exports = mongoose.model('Project', project_schema);