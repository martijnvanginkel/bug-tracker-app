const connection = require('../db/connection');

const shuffleTask = async (req, res) => {
    try {
        console.log('shuffle task')

        console.log(req.body.project_id)

        const task = await connection.pool.query(`
            UPDATE tasks
            SET priority = 
                    CASE 
                        WHEN priority > 1 THEN 9
                        WHEN priority < 2 THEN 8
                    END,
                state = 'TODO'
            WHERE priority in (priority) AND state in (state)
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