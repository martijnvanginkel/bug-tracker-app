const Task = require('./../models/Task');
const connection = require('../db/connection');

const newTask = async (req, res) => {

    console.log('here')

    console.log(req.body.project_id);

    try {
        await connection.pool.query('BEGIN');
        const count_response = await connection.pool.query(`
            SELECT COUNT(state)
            FROM tasks
            WHERE state = $1 AND project_id = $2
        `, ['TODO', req.body.project_id]);
        const count = count_response.rows[0].count;
        const insert_response = await connection.pool.query(`
            INSERT INTO tasks (description, priority, state, project_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [req.body.description, count, 'TODO', req.body.project_id]);
        await connection.pool.query('COMMIT');

   
        res.json({
            task: insert_response.rows[0]
        })
    }
    catch (error) {
        try {
            console.log('here');
            await connection.pool.query('ROLLBACK');
        }
        catch (error) {
            
        }
    }


    // try {
    //     client = await connection.pool.connect();
    // }
    // catch (error) {
    //     console.log(`Client pool error: ${error}`);
    //     return error;
    // }
    // try {
    //     await client.query('BEGIN');
    //     const response = await client.query(`
    //         SELECT COUNT state FROM tasks
    //         WHERE state = $1
            
            
    //         INTO projects (name, description, creator_id)
    //         VALUES ($1, $2, $3)
    //         RETURNING *
    //     `, [req.body.name, req.body.description, req.user_id]);
    //     project = response.rows[0];
    //     await client.query('COMMIT');
    //     await client.query(`
    //         INSERT INTO users_projects (user_id, project_id)
    //         VALUES ($1, $2)
    //     `, [req.user_id, project.id]);
    // } catch (error) {
    //     console.log(`Error during transaction: ${error}`);
    //     try {
    //         await client.query('ROLLBACK');
    //     } catch (error) {
    //         console.log(`Error during rollback ${error}`);
    //     }
    //     return error;
    // }
    // finally {
    //     client.release();
    // }
}

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
    const task = req.body.task;
    const response = await Task.removeTask(req.params.id);
    await Task.decrementTasksAbove(task.project_id, task.state, task.priority);
    res.json({ task: response });
}

const editTask = async (req, res) => {
    const description = req.body.description;
    const response = await Task.editTask(req.params.id, description);
    const new_description = response.task.description
    res.json({ new_description });
}

module.exports = { newTask, moveTask, removeTask, editTask }