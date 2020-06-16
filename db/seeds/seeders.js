const usersSeed = () => {
    return {
        table_name: 'users',
        columns: [
            {
                name: 'name',
                type: 'varchar',
                values: [
                    'Martijn', 'Hank', 'John'
                ]
            },
            {
                name: 'email',
                type: 'varchar',
                values: [
                    'hoi@hoi.nl', 'martijn@martijn.nl', 'hallo@hallo.com'
                ]
            },
            {
                name: 'password',
                type: 'varchar',
                values: [
                    'poop', 'kak', 'poepies'
                ]
            }
        ]
    }
}


const projectsSeed = () => {
    return {
        table_name: 'projects',
        columns: [
            {
                name: 'name',
                type: 'varchar',
                values: [
                    'Martijn', 'Hank', 'John'
                ]
            },
            {
                name: 'description',
                type: 'text',
                values: [
                    'Lorem', 'Ipsum', 'Dolor'
                ]
            },
            {
                name: 'non_public',
                type: 'boolean',
                values: [
                    true, true, false
                ]
            }
        ]
    }
}

const tasksSeed = () => {
    return {
        table_name: 'tasks',
        columns: [
            {
                name: 'description',
                type: 'varchar',
                values: [
                    'One', 'Two', 'three', 'four', 'five', 'six', 'seven'
                ]
            },
            {
                name: 'priority',
                type: 'int',
                values: [
                    0, 0, 1, 2, 0, 1, 2
                ]
            },
            {
                name: 'state',
                type: 'varchar',
                values: [
                    'DOING', 'TODO', 'DOING', 'DOING', 'DONE', 'DONE', 'DONE'
                ]
            },
            {
                name: 'project_id',
                type: 'int',
                values: [
                    1, 1, 1, 1, 1, 1, 1
                ]
            }
        ]
    }
}

/* Add function to array to include it in seeder */
module.exports = { 
    seeds: [
        usersSeed(), projectsSeed(), tasksSeed()
    ]
}