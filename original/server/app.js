const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { port } = require('../config');
const messages = require('./database/message.json');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Store all messages in current runtime
const cachedMessages = [...messages];

/**
 * Get all messages
 */
app.get('/message', (req, res) => {
    res.json({
        messages: cachedMessages.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at); // Sort by latest
        }),
    });
})

/**
 * Add a new message (into memory)
 */
app.post('/message', (req, res) => {
    const { message } = req.body;
    cachedMessages.push(message);
    res.send('successfully added to cache!');
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})