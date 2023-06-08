const express = require('express');
const cors = require('cors');
const { readAllEvents, addVolunteerToEvent, readUser } = require('./mongooseUtils');

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

router.post('/volunteer', async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await readUser(email);
        const event = await addVolunteerToEvent(name, user);
        if (event == null) {
            res.status(400).send({ message: 'Could not add to event' });
            return;
        }
        res.json({ message: 'Volunteer added to event' });
    } catch (error) {
        console.error('Error adding volunteer to event:', error);
        res.status(500).send({ message: 'Error adding volunteer to event' });
    }
});

module.exports = router;