const express = require('express');
const cors = require('cors');

const router = express.Router();

router.use(express.json());
router.use(cors());

router.get('/', (req, res) => {
    res.send('kids home');
}
);

router.get('/all', (req, res) => {
    res.send('all kids');
}
);