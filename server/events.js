const express = require('express');
const cors = require('cors');
const { readAllEvents, addVolunteerToEvent } = require('./mongooseUtils');

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

router.post('/volunteer', (req, res) => {
    const { eventName, email } = req.body;

    addVolunteerToEvent(eventName, email).then((event) => {
        if (!event) {
            res.status(400).send({ message: 'Couldnt add to event' });
            return;
        }
        res.json({ message: 'Volunteer added to event' });
    }).catch((error) => {
        console.error('Error adding volunteer to event:', error);
        res.status(500).send({ message: 'Error adding volunteer to event' });
    });
}
);

module.exports = router;