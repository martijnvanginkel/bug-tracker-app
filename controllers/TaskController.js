const connection = require('../db/connection');

const shuffleTask = async (req, res) => {
    try {
        console.log('shuffle task')

        console.log(req.body.project_id)

        const task = await connection.pool.query(`
            UPDATE tasks
            SET priority = 3, state = 'asdf'
            WHERE id = ${req.params.id}
        `);

        console.log(task)

        const result = task.rows;
        res.json({ result });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message });
    }
}

module.exports = { shuffleTask }