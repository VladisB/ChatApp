const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
let app = express();
let port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket)=>{
	console.log('A new user just connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!')); 

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined')); 

	socket.on('createMessage' , (message, callback) => {
		console.log('Create message', message);			
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is the server');
	});
	
	socket.on('createLocationMessage' , (coords) => {
		io.emit('newLocationMessage', generateLocationMessage(`Admin`, coords.lat, coords.lng))
	});

	socket.on('disconnect', ()=> {
		console.log('User was disconnected');
	});
});

app.use(express.static(publicPath));

server.listen(port, ()=>{
	console.log(`Server is runing on ${port} port !`);
})