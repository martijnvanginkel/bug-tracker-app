const connection = require('../db/connection');

const shuffleTask = async (req, res) => {
    try {
        console.log('shuffle task')
        console.log(req.body.project_id)
        
        const project = {};
        res.json({ project });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message });
    }
}

module.exports = { shuffleTask }