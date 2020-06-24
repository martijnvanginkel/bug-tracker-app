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
        name varchar(255),
        email varchar(255) UNIQUE,
        password varchar(255)
    `);
}

const projectsTable = () => {
    return formatTable('projects', `
        id SERIAL PRIMARY KEY,
        name varchar(255),
        description text,
        creator_id int references users (id)
    `);
}

const usersProjectsTable = () => {
    return formatTable('users_projects', `
        id SERIAL PRIMARY KEY,
        user_id int references users (id),
        project_id int references projects (id)
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
        usersTable(), projectsTable(), tasksTable(), usersProjectsTable()
    ]
}