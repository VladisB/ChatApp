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

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app!',
		createdAt: new Date().getTime()
	}); 

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined!',
		createdAt: new Date().getTime()
	}); 

	socket.on('createMessage' , (message) => {
		console.log('Create message', message);			
		io.emit('newMessage',{
			from: message.from,
			text: message.text,
			createAt : new Date().getTime() 
		});
		// socket.broadcast.emit('newMessage',{
		// 		from: message.from,
		// 		text: message.text,
		// 		createAt : new Date().getTime() 
		// 	})
	});

	socket.on('disconnect', ()=> {
		console.log('User was disconnected');
	});
});

app.use(express.static(publicPath));

server.listen(port, ()=>{
	console.log(`Server is runing on ${port} port !`);
})