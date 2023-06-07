const express = require('express');
const cors = require('cors');

router = express.Router();
router.use(express.json());
router.use(cors());

router.get('/', (req, res) => {
    res.send('image home');
}
);

router.get('/:image', (req, res) => {
    const { image } = req.params;
    res.sendFile(image, { root: './images' });
}
);


module.exports = router;