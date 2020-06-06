const connection = require('./../connection.js')
const migrations = require('./migrations.js')

const migrateTable = async (table) => {
    try {
        await connection.pool.query(`DROP TABLE IF EXISTS ${table.name} CASCADE`);
        await connection.pool.query(`${table.query}`);
    }
    catch (error) {
        console.log(`${error}`);
    }
}

const migrateTables = async () => {
    const tables = migrations.tables;
    for (const key in tables) await migrateTable(tables[key]);
    await connection.pool.end();
    console.log('\nMigrations done');
}

migrateTables();