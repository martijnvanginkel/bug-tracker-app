const formatTable = (name, query) => {
    return {
        name: `${name}`,
        query: `CREATE TABLE ${name} (${query});`
    }
}

/* Put tables here */
const usersTable = () => {
    return formatTable('users', `
        id SERIAL PRIMARY KEY,
        name varchar(255),
        email varchar(255) UNIQUE,
        password varchar(255)
    `);
}

/* Add function to array to include it in migration */
module.exports = { 
    tables: [
        usersTable()
    ]
}