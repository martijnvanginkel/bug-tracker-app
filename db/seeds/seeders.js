const usersSeed = () => {
    return {
        table_name: 'users',
        columns: [
            {
                name: 'name',
                type: 'varchar',
                values: [
                    'Martijn'
                ]
            },
            {
                name: 'email',
                type: 'varchar',
                values: [
                    'martijn@martijn.nl'
                ]
            },
            {
                name: 'password',
                type: 'varchar',
                values: [
                    'password'
                ]
            }
        ]
    }
}

/* Add function to array to include it in seeder */
module.exports = { 
    seeds: [
        usersSeed()
    ]
}