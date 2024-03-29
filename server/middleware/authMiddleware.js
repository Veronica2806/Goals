const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: "User is not authorized" })
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedData
        next();
    } catch (error) {
        return res.status(401).json({ message: "User is not authorized" })
    }
}
