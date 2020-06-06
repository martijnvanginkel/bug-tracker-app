const pg = require('pg');

const pool = new pg.Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'bugtracker',
    max: 5,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

module.exports = { pool }