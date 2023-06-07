const express = require('express');
const cors = require('cors');

const { readUser, createUser } = require('./mongooseUtils.js');
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(express.json());
router.use(cors());



router.get('/', (req, res) => {
    res.send('auth home');
}
);

router.post('/login', (req, res) => {
    // parse req to json
    const { email, password } = req.body;
    if (email == null || password == null) {
        res.status(400).send('Missing username or password');
        console.log(email, password);
        return;
    }
    readUser(email).then((user) => {
        if (user) {
            // user found
            console.log(user);
            res.send('User found');
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
    readUser(name).then((user) => {
        if (user) {
            // user already exists
            console.log('User already exists');
            res.status(409).send('User already exists');
        } else {
            // user does not exist
            try {
                createUser(name, password, email, isVolunteer).then(() => {
                    console.log('User created');
                    res.send('User created');
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



module.exports = router;