const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

refreshTokens = [];

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

function generateAccessToken(user, refreshToken) {
    if (!refreshTokens.includes(refreshToken)) {
        return null;
    }

    return jwt.sign(user, secretKey, { expiresIn: '1m' });
}

function generateRefreshToken(user) {
    token = jwt.sign(user, secretKey);
    refreshTokens.push(token);
    return token;
}

function removeRefreshToken(token) {
    refreshTokens = refreshTokens.filter(t => t !== token);
}



module.exports = {
    authenticateToken,
    generateAccessToken,
    generateRefreshToken,
    removeRefreshToken
};