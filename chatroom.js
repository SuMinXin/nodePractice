const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/view/css'));
app.use(express.static(__dirname + '/js'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '\\view\\index.html');
});

app.post('/chatroom', function(request, response) {
    userName = request.body.username;
    response.sendFile(__dirname + '\\view\\chatView.html');
});

let onlineCount = 0;
let userName = '';

io.on('connection', (socket) => {
	console.log('Hey, Nice To See You.');

	onlineCount++;
	io.emit("online", onlineCount);
	io.emit("user", userName);

	socket.on('greet', () => {
		socket.emit("greet", "Hello, my guest.");
		socket.emit("greet", onlineCount);
	});

	socket.on("send", (message) => {
		if (Object.keys(message).length < 1) return;
		io.emit("message", message);
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