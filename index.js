const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let onlineCount = 0;

app.get('/', (request,response) => {
	response.sendFile(__dirname + '\\view\\chatView.html');
});

io.on('connection', (socket) => {
	console.log('Hey, Nice To See You.');

	onlineCount++;
	io.emit("online", onlineCount);

	socket.on('greet', () => {
		socket.emit("greet", "Hello, my guest.");
		socket.emit("greet", onlineCount);
	});

	socket.on("send", (message) => {
		console.log(message);
	});

	socket.on('disconnect', () => {
		onlineCount = onlineCount - 1;
		io.emit("online", onlineCount);

		console.log('Bye!');
	});
});

server.listen(3000, ()=> {
	console.log("Server Started. port:3000");
});