const connection = require('../db/connection');
const bcrypt = require('bcrypt'); 
const passport = require('passport');


const initializePassport = require('./passport-config');
initializePassport(
    passport, 
    email => 
)

const getLogin = async (req, res) => {
    res.render('auth/login');
}

const getRegister = async (req, res) => {
    res.render('auth/register');
}

const postRegister = async (req, res) => {
    try {
        const hashed_password = await bcrypt.hash(req.body.password, 10);
        await connection.pool.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
        `, [req.body.name, req.body.email, hashed_password]);
        res.redirect('login');
    } 
    catch (error) {
        res.redirect('register');
    }
}

module.exports = { getLogin, getRegister, postRegister }