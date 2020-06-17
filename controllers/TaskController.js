const connection = require('../db/connection');

const shuffleTask = async (req, res) => {
    try {
        console.log('shuffle task')
        console.log(`a${req.body.old_state.priority}a`)
        console.log(`a${req.body.new_state.priority}a`)

        if (req.body.new_state.priority < req.body.old_state.priority) {
            console.log('update up');
            const task = await connection.pool.query(`
                UPDATE tasks
                SET priority = 
                    CASE
                        WHEN priority BETWEEN ${req.body.new_state.priority} AND ${req.body.old_state.priority - 1} THEN priority + 1
                        WHEN priority = ${req.body.old_state.priority} THEN ${req.body.new_state.priority}
                    END
                WHERE state = '${req.body.old_state.state}' AND project_id = ${req.body.project_id} AND priority BETWEEN ${req.body.new_state.priority} AND ${req.body.old_state.priority}
            `);
        }
        else {
            console.log('update down');
            const task = await connection.pool.query(`
                UPDATE tasks
                SET priority = 
                    CASE
                        WHEN priority BETWEEN ${req.body.old_state.priority} AND ${req.body.new_state.priority - 1} THEN priority - 1
                        WHEN priority = ${req.body.old_state.priority} THEN ${req.body.new_state.priority}
                    END
                WHERE state = '${req.body.old_state.state}' AND project_id = ${req.body.project_id} AND priority BETWEEN ${req.body.old_state.priority} AND ${req.body.new_state.priority}
            `);
        }
        // WHEN priority BETWEEN 0 AND 1 THEN priority + 1
        // WHEN priority = ${req.body.old_state.priority} THEN ${req.body.new_state.priority}



        // await connection.pool.query(`
        //     UPDATE tasks
        //     SET priority = priority + 1
        //     WHERE priority >= $1 AND state = $2
        // `, [req.body.new_state.priority, req.body.new_state.state]);
        const result = {};
        // console.log(result[0]);
        res.json({ result });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message });
    }
}

module.exports = { shuffleTask }