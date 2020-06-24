const jwt = require('jsonwebtoken');

const extractUser = (req) => {
    const token = req.cookies['jwt-token'];
    const decoded = jwt.verify(token, 'secretkey');
    // console.log(decoded);
    const user_id = decoded.id;
    return user_id;
}

module.exports = { extractUser }
