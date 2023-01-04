const http = require('http');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static("express"));

// MongoDB



// listener
const server = http.createServer(app);
const port = 4040;
server.listen(port);

console.debug('Server listening on port ' + port);
