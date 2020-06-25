const jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
    const token = req.cookies['jwt-token'];
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user_id = decoded.id;;
        next();
    }
    catch (error) {
        res.status(400).send('Invalid token');
    }
}

module.exports = { isAuthorized }