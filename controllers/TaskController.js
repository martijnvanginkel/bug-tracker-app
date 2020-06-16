const connection = require('../db/connection');

const shuffleTask = async (req, res) => {
    try {
        console.log('shuffle task')

        console.log(req.body.project_id)

        const task = await connection.pool.query(`
            UPDATE tasks
            SET priority = $1, state = $2
            WHERE id = $3
        `, [req.body.new_state.priority, req.body.new_state.state, req.params.id]);

        const tasks = await connection.pool.query(`
            UPDATE tasks
            SET priority = priority - 1
            WHERE priority >= $1 AND state = $2
        `, [req.body.old_state.priority, req.body.old_state.state]);

        const tasks2 = await connection.pool.query(`
            UPDATE tasks
            SET priority = priority + 1
            WHERE priority > $1 AND state = $2
        `, [req.body.new_state.priority, req.body.new_state.state]);

        console.log(task)

        const result = task.rows;
        res.json({ result });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message });
    }
}

module.exports = { shuffleTask }