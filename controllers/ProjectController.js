const jwt = require('jsonwebtoken');
const connection = require('../db/connection');
const token_utils = require('./utils/token_utils');

const getProjects = async (req, res) => {
    try {
        const projects = await connection.pool.query(`
            SELECT * FROM projects
            INNER JOIN users_projects on (projects.id = users_projects.project_id)
            WHERE users_projects.user_id = $1
        `, [req.user_id]);
        res.json(projects.rows);
    }
    catch (error) {
        res.status(200).json({ message: error.message });
    }
}

const newProject = async (req, res) => {
    let client = null;
    let project = null;
    try {
        client = await connection.pool.connect();
    }
    catch (error) {
        console.log(`Client pool error: ${error}`);
        return error;
    }
    try {
        await client.query('BEGIN');
        const response = await client.query(`
            INSERT INTO projects (name, description, creator_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [req.body.name, req.body.description, req.user_id]);
        project = response.rows[0];
        await client.query('COMMIT');
        await client.query(`
            INSERT INTO users_projects (user_id, project_id)
            VALUES ($1, $2)
        `, [req.user_id, project.id]);
    } catch (error) {
        console.log(`Error during transaction: ${error}`);
        try {
            await client.query('ROLLBACK');
        } catch (error) {
            console.log(`Error during rollback ${error}`);
        }
        return error;
    }
    finally {
        client.release();
    }
    res.json({ 
        id: project.id,
        name: project.name,
    });
}


const showProject = async (req, res) => {
    let has_creator = false;
    try {
        const response = await connection.pool.query(`
            SELECT
                projects.id,
                name,
                projects.description,
                projects.creator_id,
                json_agg(json_build_object('id', tasks.id, 'priority', tasks.priority, 'description', tasks.description, 'state', tasks.state) ORDER BY priority) AS tasks
            FROM projects
            LEFT JOIN tasks ON projects.id = tasks.project_id
            WHERE projects.id = $1
            GROUP BY projects.id, name, projects.description, creator_id
            `, [req.params.id]);
        const data = response.rows[0];
        if (data.creator_id !== null) {
            if (data.creator_id === req.user_id) {
                has_creator = true;
            }
        }
        res.json({ 
            'data': data,
            'has_creator': has_creator,
            'user_id': req.user_id
        });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message });
    }
}

const leaveProject = async (req, res) => {
    try {
        await connection.pool.query(`
            DELETE FROM users_projects
            WHERE user_id = $1 AND project_id = $2
        `, [req.user_id, req.params.id]);
        console.log('done leaving');
        res.json({ 'project_id': req.params.id });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message }); 
    }
}

module.exports = { getProjects, newProject, showProject, leaveProject }