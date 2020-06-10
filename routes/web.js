const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/AuthController');


router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/login', AuthController.getLogin);
router.get('/register', AuthController.getRegister);
router.post('/register', AuthController.postRegister);

module.exports = router;