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



/* Add function to array to include it in migration */
module.exports = { 
    tables: [
        usersTable(), projectsTable()
    ]
}