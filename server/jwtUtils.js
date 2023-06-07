const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

refreshTokens = [];
refreshTokensToEmail = {};

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

function generateAccessToken(refreshToken) {
    if (!refreshTokens.includes(refreshToken)) {
        return null;
    }

    return jwt.sign(refreshTokensToEmail[refreshToken], secretKey, { expiresIn: '1m' });
}

function generateRefreshToken(email) {
    token = jwt.sign(email, secretKey);
    refreshTokens.push(token);
    refreshTokensToEmail[token] = email;
    return token;
}

function removeRefreshToken(token) {
    refreshTokens = refreshTokens.filter(t => t !== token);
    delete refreshTokensToEmail[token];
}



module.exports = {
    authenticateToken,
    generateAccessToken,
    generateRefreshToken,
    removeRefreshToken
};