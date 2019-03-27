const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { port } = require('../config');
const messages = require('./database/message.json');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Store all messages in current runtime
const cachedMessages = [...messages];

/**
 * WebSocket connection => keep-alive connection
 */
io.on('connection', (socket) => {
    console.log('CONNECTED');
    /**
     * Get all messages
     */
    socket.emit('messages', cachedMessages.sort((a, b) => { // emit to sender socket only
        return new Date(a.created_at) - new Date(b.created_at);
    }));

    /**
     * Add a new message (into memory)
     */
    socket.on('newMessage', (message) => {
        cachedMessages.push(message);
        socket.broadcast.emit('newMessage', message); // emit to all clients except sender
    })

    /**
     * Monitor disconnect
     */
    socket.on('disconnect', () => {
        console.log('DISCONNECTED');
    });
});

server.listen(port, () => {
    console.log(`Server listening on ${port}`);
})