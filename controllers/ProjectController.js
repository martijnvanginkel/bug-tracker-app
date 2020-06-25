const jwt = require('jsonwebtoken');
const connection = require('../db/connection');
const token_utils = require('./utils/token_utils');
const { connect } = require('mongoose');

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
    // let client = null;
    // let project = null;
    // try {
    //     client = await connection.pool.connect();
    // }
    // catch (error) {
    //     console.log(`Client pool error: ${error}`);
    //     return error;
    // }
    try {
        await connection.pool.query('BEGIN');
        const response = await connection.pool.query(`
            INSERT INTO projects (name, description, creator_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [req.body.name, req.body.description, req.user_id]);
        const project = response.rows[0];
        await connection.pool.query('COMMIT');
        await connection.pool.query(`
            INSERT INTO users_projects (user_id, project_id)
            VALUES ($1, $2)
        `, [req.user_id, project.id]);
        await connection.pool.query('COMMIT');
        res.json({
            id: project.id,
            name: project.name
        });
    } catch (error) {
        // console.log(`Error during transaction: ${error}`);
        // try {
        await connection.pool.query('ROLLBACK');
        res.status(status.error).json({ message: error.message });
    }
    // finally {
    //     client.release();
    // }
    // res.json({ 
    //     id: project.id,
    //     name: project.name,
    // });
}


const showProject = async (req, res) => {
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
        res.json({ 
            'data': data,
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
        res.json({ 'project_id': req.params.id });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message }); 
    }
}

const inviteUser = async (req, res) => {

    try {
        client = await connection.pool.connect();
    }
    catch (error) {
        res.status(status.error).json({ message: error.message }); 
    }
    try {
        console.log(req.body.email)
        // await client.query('BEGIN');
        const response = await client.query(`
            SELECT id, email FROM users
            WHERE email = $1
        `, [req.body.email]);

        const user = response.rows[0];
        if (user === undefined || user === null) {
            return res.json({ message: 'No user found' });
        }

        await client.query(`
            
        `);

        console.log(response.rows[0]);

        // project = response.rows[0];
        // await client.query('COMMIT');
        console.log('hello response invite');
        console.log(response);

    } catch (error) {
        try {
            await client.query('ROLLBACK');
        } catch (error) {
            console.log(`Error during rollback ${error}`);
        }
        res.status(status.error).json({ message: error.message }); 
    }
    // finally {
    //     client.release();
    // }
    res.json({ 

    });
}

module.exports = { getProjects, newProject, showProject, leaveProject, inviteUser }