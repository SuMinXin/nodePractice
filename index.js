const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (request,response) => {
	//response.send('Yo, World!');
	response.sendFile(__dirname + '\\view\\chatView.html');
});

io.on('connection', (socket) => {
	console.log('Hey, Nice To See You.');

	socket.on('disconnect', () => {
		console.log('Bye!');
	});
});

server.listen(3000, ()=> {
	console.log("Server Started. port:3000");
});