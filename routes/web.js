const express = require('express');
const router = express.Router();
const AuthController = require('./../controllers/AuthController');


router.get('/', (req, res) => {
    res.render('index');
})
router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
router.get('/register', AuthController.getRegister);
router.post('/register', AuthController.postRegister);

module.exports = router;