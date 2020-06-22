const connection = require('./../db/connection');

const removeTask = async (id) => {
    try {
        const response = await connection.pool.query(`
            DELETE FROM tasks
            WHERE id = $1
            RETURNING *
        `, [id]);
        const task = response.rows[0];
        return { task };
    }
    catch (error) {
        return { error: error.message };
    }
}

const editTask = async (id, description) => {
    try {
        const response = await connection.pool.query(`
            UPDATE tasks
            SET description = $2
            WHERE id = $1
            RETURNING description
        `, [id, description]);
        const task = response.rows[0];
        return { task };
    }
    catch (error) {
        return { error: error.message };
    }
}

const decrementTasksAbove = async (project_id, state, priority) => {
    try {
        const response = await connection.pool.query(`
            UPDATE tasks
            SET priority = priority - 1
            WHERE priority > $1 AND state = $2 AND project_id = $3
        `, [priority, state, project_id]);
        return { response: response };
    }
    catch (error) {
        return { error: error.message };
    }
}

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
        /* Increment the tasks above the task in the new location */
        await connection.pool.query(`
            UPDATE tasks
            SET priority = priority + 1
            WHERE state = $1 AND priority >= $2 AND project_id = $3
        `, [new_pos.state, new_pos.priority, project_id]);
        /* Decrement the tasks above the task in the old location */
        await connection.pool.query(`
            UPDATE tasks
            SET priority = priority - 1
            WHERE state = $1 AND priority > $2 AND project_id = $3
        `, [old_pos.state, old_pos.priority, project_id]);
        /* Update the task itself */
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

module.exports = { removeTask, editTask, decrementTasksAbove, relocateTask, sortTaskUp, sortTaskDown }