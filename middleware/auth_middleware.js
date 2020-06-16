const jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
    const token = req.cookies['jwt-token'];
    if (!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token, 'secretkey');
        next();
    }
    catch (error) {
        res.status(400).send('Invalid token');
    }
}

module.exports = { isAuthorized }