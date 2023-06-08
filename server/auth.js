const express = require('express');
const cors = require('cors');


const { readUser, createUser } = require('./mongooseUtils.js');
const { authenticateToken, generateAccessToken, generateRefreshToken, removeRefreshToken } = require('./jwtUtils.js');
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(express.json());
router.use(cors());

const secretKey = 'your-secret-key';


router.get('/', (req, res) => {
    res.send('auth home');
}
);

router.post('/login', (req, res) => {
    // parse req to json
    const { email, password } = req.body;
    if (email == null || password == null) {
        res.status(400).send('Missing email or password');
        console.log(email, password);
        return;
    }
    readUser(email).then((user) => {
        if (user) {
            // user found
            console.log(user);
            const refreshToken = generateRefreshToken({ email });
            const token = generateAccessToken(refreshToken);

            bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    // password match
                    console.log('User logged in');
                    res.json({ token, refreshToken });
                }
                else {
                    // password mismatch
                    console.log('Wrong password');
                    res.status(401).send('Wrong password');
                }
            }).catch((error) => {
                console.error('Error comparing passwords:', error);
                res.status(500).send('Error comparing passwords');
            });
        } else {
            // user not found
            console.log('User not found');
            res.status(404).send('User not found');
        }
    }).catch((error) => {
        console.error('Error reading user:', error);
        res.status(500).send('Error reading user');
    });
    // check if user exists
}
);

router.post('/register', (req, res) => {
    const { name, password, email, isVolunteer } = req.body;
    if (name == null || password == null || email == null || isVolunteer == null) {
        res.status(400).send('Missing name, password, email or isVolunteer');
        console.log('Missing name, password, email or isVolunteer');
        console.log("nameCheck: ", !name, "passwordCheck: ", !password, "emailCheck: ", !email, "isVolunteerCheck: ", isVolunteer != null)
        return;
    }
    readUser(email).then((user) => {
        if (user) {
            // user already exists
            console.log('User already exists');
            res.status(409).send('User already exists');
        } else {
            // user does not exist
            try {
                createUser(name, password, email, isVolunteer).then((user) => {
                    if (!user) {
                        res.status(500).send('Error creating user');
                        return;
                    }

                    refreshToken = generateRefreshToken({ email });
                    token = generateAccessToken(refreshToken);

                    console.log('User created');
                    res.json({ token, refreshToken });
                }
                );
            }
            catch (error) {
                console.error('Error creating user:', error);

                res.status(500).send('Error creating user');
            }
        }
    }).catch((error) => {
        console.error('Error reading user:', error);
        res.status(500).send('Error reading user');
    });
}
);

router.post('/logout', (req, res) => {
    const { refreshToken } = req.body;
    if (refreshToken == null) {
        res.status(400).send('Missing refreshToken');
        console.log('Missing refreshToken');
        return;
    }
    removeRefreshToken(refreshToken).then((result) => {
        if (result) {
            console.log('Refresh token removed');

            res.status(200).send('Refresh token removed');
        } else {
            console.log('Refresh token not found');
        }
    }).catch((error) => {
        console.error('Error removing refresh token:', error);
        res.status(500).send('Error removing refresh token');
    });
}
);


module.exports = router;