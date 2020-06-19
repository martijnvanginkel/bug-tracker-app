const connection = require('./../db/connection');

const sortTaskDown = async (old_pos, new_pos, project_id) => {
    try {     
        const task = await connection.pool.query(`
            UPDATE tasks
            SET priority = 
                CASE
                    WHEN priority BETWEEN $1 + 1 AND $2 THEN priority - 1
                    WHEN priority = $1 THEN $2
                END
            WHERE state = $3 AND project_id = $4 AND priority BETWEEN $1 AND $2
        `, [old_pos.priority, new_pos.priority, old_pos.state, project_id]);
        return { task };
    }
    catch (error) {
        return { error: error.message };
    }
}

const sortTaskUp = async (old_pos, new_pos, project_id) => {
    try {  
        const task = await connection.pool.query(`
            UPDATE tasks
            SET priority = 
                CASE
                    WHEN priority BETWEEN $1 AND $2 - 1 THEN priority + 1
                    WHEN priority = $2 THEN $1
                END
            WHERE state = $3 AND project_id = $4 AND priority BETWEEN $1 AND $2
        `, [new_pos.priority, old_pos.priority, old_pos.state, project_id]);
        return { task };
    }
    catch (error) {
        return { error: error.message };
    }
}

const relocateTask = async (old_pos, new_pos, id, project_id) => {
    try {
        await connection.pool.query(`
            UPDATE tasks
            SET priority = priority + 1
            WHERE state = $1 AND priority >= $2 AND project_id = $3
        `, [new_pos.state, new_pos.priority, project_id]);  
        await connection.pool.query(`
            UPDATE tasks
            SET priority = priority - 1
            WHERE state = $1 AND priority > $2 AND project_id = $3
        `, [old_pos.state, old_pos.priority, project_id]);
        const task = await connection.pool.query(`
            UPDATE tasks
            SET priority = $1,
                state = $2
            WHERE id = $3
        `, [new_pos.priority, new_pos.state, id]);
        return { task };
    }
    catch (error) {
        return { error: error.message };
    }
}

module.exports = { relocateTask, sortTaskUp, sortTaskDown }