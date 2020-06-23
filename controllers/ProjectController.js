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
    // try {
        const token = req.cookies['jwt-token'];
        const decoded = jwt.verify(token, 'secretkey');
        const user_id = decoded.id;
        

        
        // try {
        //     // await connection.pool.query('BEGIN');
        //     await connection.pool.query(`
        //     INSERT INTO projects (name, description)
        //     VALUES ($1, $2)
        //     `, ['asdf', 'HEY']);
        //     console.log('here');
            
        // } catch (error) {
        //     console.log(error)            
        // }


        const client = connection.pool;
        try {
            await client.query('BEGIN');
            try {
                
                const queryText = 'INSERT INTO projects (name, description ) VALUES ($1, $2)';
                const res = await client.query(queryText, ['hoi', 'asdf'])
    
                const queryText2 = 'INSERT INTO projects (name, description ) VALUES ($1, $2)';
                const res2 = await client.query(queryText2, ['asdf', 'zxvc']);
         
                await client.query('COMMIT')
            }
            catch (error) {
                
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            // client.release()
        }
        




        // await connection.pool.query('BEGIN', async () => {

        //     await connection.pool.query(`   
        //         INSERT INTO projects (name, description)
        //         VALUES ($1, $2)
        //     `,['hoi', 'hallo']);
        // });


        // const project = await connection.pool.query(`


        //         BEGIN
          

                
        //     `, ['HOI', 'HALLO']);

        // INSERT INTO projects (name, description)
        // VALUES ($1, $2)
        // RETURNING *
        // console.log(project.rows[0]);

        // res.json({
        //     id: project.rows[0].id,
        //     name: project.rows[0].name
        // })


        // res.json({
        //     id: project.rows[0].id,
        //     name: project.rows[0].name
        // });

        // console.log(project.rows[0])
        // res.json({});
        // res.json({ project.rows[0] });
    // }
    // catch (error) {
    //     console.log(error);
    //     res.status(status.error).json({ message: error.message });
    // }
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