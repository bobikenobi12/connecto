const express = require('express');
const cors = require('cors');

const { authenticateToken, generateAccessToken, generateRefreshToken, removeRefreshToken } = require('./jwtUtils');

const authRouter = require('./auth');
const kidsRouter = require('./kids');
const imageRouter = require('./image');
const eventRouter = require('./events');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/kids', kidsRouter);
app.use('/image', imageRouter);
app.use('/events', eventRouter);


app.post('/refreshAccessToken', (req, res) => {
    const { refreshToken } = req.body;
    if (refreshToken == null) {
        return res.sendStatus(401).json({ message: 'No refresh token' });
    }
    accessToken = generateAccessToken(refreshToken);
    if (accessToken == null) {
        return res.sendStatus(403).json({ message: 'Invalid refresh token' });
    }
    res.json({ accessToken });
}
);

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.get('/protected', authenticateToken, (req, res) => {
    res.send('Protected data');
}
);

app.listen(3000, () => {
    console.log('Example app listening on localhost:3000');
}
);

