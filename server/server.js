const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
let app = express();
let port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket)=>{
	console.log('A new user just connected');

	socket.on('disconnect', ()=> {
		console.log('User was disconnected');
	});
});

app.use(express.static(publicPath));

server.listen(port, ()=>{
	console.log(`Server is runing on ${port} port !`);
})