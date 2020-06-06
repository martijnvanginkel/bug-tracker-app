const connection = require('./../connection.js')
const seeders = require('./seeders.js')

const seedTable = async (query, seed_values) => {
    try {
        await connection.pool.query(query, seed_values);
    } 
    catch (error) {
        console.log(`${error}`);
    }
}

const convertColumnNames = (columns) => {
    let result = '(';
    for (let i = 0; i < columns.length; i++) {
        result = result.concat(columns[i].name);     
        if (i === columns.length - 1) {
            result = result.concat(')');
            break;
        }
        result = result.concat(', ');     
    }
    return result;
}

const convertColumnTypes = (columns) => {
    let result = '(';
    for (let i = 0; i < columns.length; i++) {
        result = result.concat(`$${i + 1}::${columns[i].type}[]`);
        if (i === columns.length - 1) {
            result = result.concat(')');
            break;
        }
        result = result.concat(', ');
    }
    return result;
}

const convertColumnValues = (columns) => {
    let result = [];
    columns.forEach((column) => result.push(column.values));
    return result;
}

const convertSeedToQuery = (seed) => {
    const columns = convertColumnNames(seed.columns);
    const types = convertColumnTypes(seed.columns);
    const query = `INSERT INTO ${seed.table_name} ${columns} SELECT * FROM UNNEST ${types}`;
    return query;
}

const seedTables = async () => {
    const seeds = seeders.seeds;
    for (const key in seeds) {
        const query = convertSeedToQuery(seeds[key]);
        const seed_values = convertColumnValues(seeds[key].columns);
        await seedTable(query, seed_values);
    }
    await connection.pool.end();
    console.log('\nSeeds done');
}

seedTables();
