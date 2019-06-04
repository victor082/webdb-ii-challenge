const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('../zoos/zoos-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoos', zoosRouter);

server.get('/', (req, res) => {
    res.json({ message: 'retrieved data from server' })
})

module.exports = server;
