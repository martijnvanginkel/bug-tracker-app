const Task = require('./../models/Task');

const moveTask = async (req, res) => {
    const old_pos = req.body.old_pos;
    const new_pos = req.body.new_pos;
    let result;
    try {
        if (old_pos.state === new_pos.state) {
            if (old_pos.priority < new_pos.priority) {
                result = Task.sortTaskDown(old_pos, new_pos, req.body.project_id);
            }
            else {
                result = Task.sortTaskUp(old_pos, new_pos, req.body.project_id);
            }
        }
        else {
            result = Task.relocateTask(old_pos, new_pos, req.params.id, req.body.project_id);
        }
        res.json({ result });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message });
    }
}

module.exports = { moveTask }