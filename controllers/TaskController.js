const Task = require('./../models/Task');

const moveTask = async (req, res) => {
    const old_pos = req.body.old_pos;
    const new_pos = req.body.new_pos;
    let response;

    if (old_pos.state !== new_pos.state) {
        response = await Task.relocateTask(old_pos, new_pos, req.params.id, req.body.project_id);
    }
    else if (old_pos.priority < new_pos.priority) {
        response = await Task.sortTaskDown(old_pos, new_pos, req.body.project_id);
    }
    else {
        response = await Task.sortTaskUp(old_pos, new_pos, req.body.project_id);
    }
    if (response.error) {
        res.status(status.response.error).json({ message: response.error.message });
    }
    res.json({ response });
}

const removeTask = async (req, res) => {
    
    
    res.json({ hoi: 'hoi' })
}

module.exports = { moveTask, removeTask }