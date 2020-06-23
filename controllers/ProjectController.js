const connection = require('../db/connection');
const jwt = require('jsonwebtoken');

const getProjects = async (req, res) => {
    try {
        const projects = await connection.pool.query(`SELECT * FROM projects`);
        res.json(projects.rows);
    }
    catch (error) {
        res.status(200).json({ message: error.message });
    }
}

const newProject = async (req, res) => {
    const token = req.cookies['jwt-token'];
    const decoded = jwt.verify(token, 'secretkey');
    const user_id = decoded.id;
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
            INSERT INTO projects (name, description)
            VALUES ($1, $2)
            RETURNING *
        `, [req.body.name, req.body.description]);
        project = response.rows[0];
        await client.query('COMMIT');
        await client.query(`
            INSERT INTO users_projects (user_id, project_id)
            VALUES ($1, $2)
        `, [user_id, project.id]);
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
    try {
        const project = await connection.pool.query(`
            SELECT
                name,
                projects.description,
                json_agg(json_build_object('id', tasks.id, 'priority', tasks.priority, 'description', tasks.description, 'state', tasks.state) ORDER BY priority) AS tasks
            FROM projects
            LEFT JOIN tasks ON projects.id = tasks.project_id
            WHERE projects.id = $1
            GROUP BY name, projects.description
            `, [req.params.id]);
            const data = project.rows;
        res.json({ data });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message });
    }
}

module.exports = { getProjects, newProject, showProject }