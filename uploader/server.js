const express = require('express');
const cors = require('cors');
const host = '193.243.158.230';
const port = 4500;
// const host = '192.168.1.143';

const app = express();

app.use(cors());
app.use(express.json({limit: '10mb'}));

// Middleware to check auth header
app.use(function (req, res, next) {
    if (req.headers.authorization !== 'test-task')
        return res.status(401).send({ status: "NOT OK", message: 'Unauthorized' });

    next();
});

app.post('/api/import', (req, res) => {
    res.status(200).json({ status: "OK", message: 'Server has got bunch of data' });
});

app.listen(port, host, () => { console.log(`Server is listening on http://${host}:${port}`) });