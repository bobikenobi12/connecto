const express = require('express');
const cors = require('cors');
const { readAllEvents } = require('./mongooseUtils');

router = express.Router();
router.use(express.json());
router.use(cors());

router.get('/', (req, res) => {
    res.send('events home');

}
);


router.get('/all', (req, res) => {
    readAllEvents().then((events) => {
        res.json(events);
    }).catch((error) => {
        console.error('Error reading events:', error);
        res.status(500).send('Error reading events');
    });
}
);

module.exports = router;