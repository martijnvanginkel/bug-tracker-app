const connection = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getLogin = async (req, res) => {
    res.render('auth/login', { message: req.flash('message') } );
}

const getRegister = async (req, res) => {
    res.render('auth/register', { message: req.flash('message') });
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
        req.flash('message', 'no user found');
        return res.redirect('login');
    }
    const correct_password = await bcrypt.compare(req.body.password, user.password);
    if (!correct_password) {
        req.flash('message', 'incorrect password')
        return res.redirect('login');
    }
    const token = jwt.sign({ 
        id: user.id,
        name: user.name,
        email: user.email
    }, 'secretkey');
    res.cookie('jwt-token', token)
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
        req.flash('message', 'Failed to create user');
        res.redirect('register');
    }
}

const logOut = async (req, res) => {
    try {
        res.clearCookie('jwt-token');
        res.redirect('/login');
    }
    catch (error) {
        res.redirect('/');
    }
}

module.exports = { getLogin, getRegister, postRegister, postLogin, logOut }