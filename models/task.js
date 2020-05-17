const mongoose = require('mongoose');

const task_schema = new mongoose.Schema({
    description: {
        type: String
    }
});

module.exports = mongoose.model('Task', task_schema);