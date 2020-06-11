const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/AuthController');


router.get('/', checkAuthenticated ,async (req, res) => {
    console.log(`req user`)
    const user = await req.user;
    console.log(user.rows[0])
    res.render('index');
});

router.get('/login', AuthController.getLogin);


const passport = require('passport');
// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    next();
}

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})


router.get('/register', AuthController.getRegister);
router.post('/register', AuthController.postRegister);

module.exports = router;