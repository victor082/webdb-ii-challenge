const express = require('express');
const helmet = require('helmet');

const server = require('./api/server.js');

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 4000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
