const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const connection = require('../db/connection');





function initialize(passport) {

    const getUserByEmail = async (email) => {
        const user = await connection.pool.query(`
                SELECT * FROM users
                WHERE users.email = $1
            `, [ email ]);
        return user.rows[0];
    }

    const getUserById = async (id) => {
        const user = await connection.pool.query(`
                SELECT * FROM users
                WHERE users.id = $1
            `, [ id ]);
        return user;
    }


    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        console.log(user)
        if (user === null || user === undefined) {
            console.log('no user with that email')
            return done(null, false, { message: 'No user with that email' });
        }

        try {
            // console.log(password, user.password)
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                console.log('password incorrect');
                return done(null, false, { message: 'Password incorrect'});
            }
        } 
        catch (error) {
            return done(error);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));


    passport.serializeUser((user, done) => { done(null, user.id) });
    passport.deserializeUser((id, done) => { 
        done(null, getUserById(id));
     });

    // passport.use(new LocalStrategy({ usernameField: 'email' }), async (email, password, done) => {
    //     const user = await connection.pool.query(`
    //         SELECT * FROM users
    //         WHERE users.email = $1
    //     `, [ 'hoi@hoi.nl' ]);

      
    // });
}



module.exports = { initialize }