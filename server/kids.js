const express = require('express');
const cors = require('cors');
const { readAllKids } = require('./mongooseUtils');

const router = express.Router();

router.use(express.json());
router.use(cors());

router.get('/', (req, res) => {
    res.send('kids home');
}
);

router.get('/all', (req, res) => {
    readAllKids().then((kids) => {
        res.json(kids);
    }).catch((error) => {
        console.error('Error reading kids:', error);
        res.status(500).send('Error reading kids');
    });
}
);

module.exports = router;