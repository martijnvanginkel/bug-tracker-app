const formatTable = (name, query) => {
    return {
        name: `${name}`,
        query: `CREATE TABLE ${name} (${query});`
    }
}

/* Tables */
const usersTable = () => {
    return formatTable('users', `
        id SERIAL PRIMARY KEY,
        email varchar,
        age int
    `);
}

const projectsTable = () => {
    return formatTable('projects', `
        id SERIAL PRIMARY KEY,
        name varchar(255),
        description text,
        non_public boolean
    `);
}

const tasksTable = () => {
    return formatTable('tasks', `
        id SERIAL PRIMARY KEY,
        description text,
        priority int default 0,
        state varchar(255),
        project_id int references projects (id)
    `);
}



/* Add function to array to include it in migration */
module.exports = { 
    tables: [
        usersTable(), projectsTable(), tasksTable()
    ]
}