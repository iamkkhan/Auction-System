// managing all the server here
const http = require('http');

// impprting the module
const app = require('./app');

// creating the port here and the environment varible here
const Port = 9000;

// creating the server here
const server = http.createServer(app);

// listening to the server
server.listen(Port, () => console.log('Your Server has started!'));