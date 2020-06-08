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
            RETURNING *
        `, [req.body.name, req.body.description, req.body.non_public]);

        res.json({  
                name: project.rows[0].name
        });
    }
    catch (error) {
        res.status(status.error).json({ message: error.message });
    }
}

module.exports = { getProjects, newProject }