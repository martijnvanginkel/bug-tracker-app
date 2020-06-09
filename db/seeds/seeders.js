const usersSeed = () => {
    return {
        table_name: 'users',
        columns: [
            {
                name: 'email',
                type: 'varchar',
                values: [
                    'Martijn', 'Hank', 'John'
                ]
            },
            {
                name: 'age',
                type: 'int',
                values: [
                    13, 14, 27
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
                    'One', 'Two', 'three', 'four', 'five'
                ]
            },
            {
                name: 'priority',
                type: 'int',
                values: [
                    0, 1, 2, 3, 4
                ]
            },
            {
                name: 'project_id',
                type: 'int',
                values: [
                    1, 1, 1, 2, 3
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