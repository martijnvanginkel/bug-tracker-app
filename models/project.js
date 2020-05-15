const mongoose = require('mongoose');

const project_schema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    non_public: {
        type: Boolean
    }
});

module.exports = mongoose.model('Project', project_schema);