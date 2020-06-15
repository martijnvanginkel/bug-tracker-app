const connection = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getLogin = async (req, res) => {
    // req.flash('message', 'You are successfully using req-flash');
    res.render('auth/login', { message: req.flash('message') } );
}

const getRegister = async (req, res) => {
    res.render('auth/register');
    // req.flash('message', 'You are successfully using req-flash');
    // res.redirect('/login');
}

const findUserByEmail = async (email) => {
    const user = await connection.pool.query(`
        SELECT * FROM users
        WHERE users.email = $1
    `, [email]);
    return user.rows[0];
}

const postLogin = async (req, res) => {
    const user = await findUserByEmail(req.body.email);
    if (user === null || user === undefined) {
        console.log('No user found');
        req.flash('message', 'no user found');
        return res.redirect('login');
    }
    console.log('were here');
    const correct_password = await bcrypt.compare(req.body.password, user.password);
    if (!correct_password) {
        console.log('Incorrect password');
        req.flash('message', 'incorrect password')
        return res.redirect('login');
    }
    const token = jwt.sign({ 
        id: user.id,
        name: user.name,
        email: user.email
    }, 'secretkey');

    console.log('token created');
    res.cookie('cookie-name', 'cookie-value')
    // res.set('auth-token', token);
    // res.header('Access-Control-Expose-Headers', 'auth-token').header('auth-token', token);
    return res.redirect('/');
}

const postRegister = async (req, res) => {
    try {
        const hashed_password = await bcrypt.hash(req.body.password, 10);
        const user = await connection.pool.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email
        `, [req.body.name, req.body.email, hashed_password]);   
        res.redirect('login');
    } 
    catch (error) {
        res.redirect('register');
    }
}

module.exports = { getLogin, getRegister, postRegister, postLogin }