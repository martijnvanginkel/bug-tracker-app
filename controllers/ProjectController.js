const connection = require('../db/connection');

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
    try {
        const project = await connection.pool.query(`
            INSERT INTO projects (name, description, non_public) 
            VALUES ($1, $2, $3)
            RETURNING id name
        `, [req.body.name, req.body.description, req.body.non_public]);
        res.json({
            id: project.rows[0].id,
            name: project.rows[0].name
        });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message });
    }
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