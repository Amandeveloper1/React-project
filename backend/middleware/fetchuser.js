const jwt = require('jsonwebtoken');
const JWT_SECKERT = 'secondwedsite';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'please authenticate using a ' })
    }
    try {
        const data = jwt.verify(token, JWT_SECKERT)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'please authenticate using a ' });
    }
}

module.exports = fetchuser;