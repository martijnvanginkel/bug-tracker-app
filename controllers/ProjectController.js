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
        console.log(req.params.id)
        const project = await connection.pool.query(`
            SELECT
                name,
                projects.description,
                json_agg(json_build_array(tasks.id, tasks.description))
            FROM projects
            inner join tasks on projects.id = tasks.project_id
            where projects.id = ${req.params.id}
            group by name, projects.description
            
            `);
        const project2 = project.rows;
        console.log(project.rows);
        res.json({ project2 })
    }
    catch (error) {
        
    }
}

module.exports = { getProjects, newProject, showProject }