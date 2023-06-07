const express = require('express');

const authRouter = require('./auth');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(3000, () => {
    console.log('Example app listening on localhost:3000');
}
);

