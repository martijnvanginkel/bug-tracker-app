const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AuthController = require('./../controllers/AuthController');



const isAuthorized = (req, res, next) => {
    console.log('now we are here');
    // const token = req.cookie.auth-token;//('auth-token');
    // console.log(token)
    // if (!token){
    //     return res.status(401).send('no token')
    // }

    const token = req.cookies['jwt-token']; // this gets the cookie by name
    if (!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token, 'secretkey');
        console.log('yes verified bitch' + verified);
        next();
    }
    catch (error) {
        res.status(400).send('Invalid token');
    }


    next();
}


router.get('/', isAuthorized, (req, res) => {
    res.render('index');
})
router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
router.get('/register', AuthController.getRegister);
router.post('/register', AuthController.postRegister);

module.exports = router;