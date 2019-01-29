let socket = io();

socket.on('connect', ()=> {
	console.log('Connected to server');
});
socket.on('disconnect', ()=> {
	console.log('disconnected from server');
});

socket.on('newMessage', (message) => {
	console.log('New Message!', message);
	let formattedTime = moment(message.createdAt).format('LT');
	let li = document.createElement('li');
	li.innerText = `${message.from} ${formattedTime} : ${message.text}`;

	document.querySelector('#messages').appendChild(li);
});
socket.on('newLocationMessage', (message) => {
	console.log('New newLocationMessage!', message);
	let li = document.createElement('li');
	let a = document.createElement('a');
	let formattedTime = moment(message.createdAt).format('LT');
	li.innerText = `${message.from} ${formattedTime} : `;
	a.setAttribute('target', '_blank');
	a.setAttribute('href', message.url);
	a.innerText= 'My current location';
	li.appendChild(a);

	document.querySelector('#messages').appendChild(li);
});

// socket.emit('createMessage', {
// 	from: 'Vlad', 
// 	text: 'Hey'
// },(message) =>{
// 	console.log(message, '... got it!');
// });

document.querySelector('#submit-btn')
.addEventListener('click', (e) => {
	e.preventDefault(); 

	socket.emit('createMessage', {
		from: "User",
		text: document.querySelector('input[name="message"]').value
	}, () => {
		
	})
});
document.querySelector('#send-location')
.addEventListener('click', (e) => {
	e.preventDefault(); 

	if(!navigator.geolocation){
		return alert('Geolocation is not supported by your browser!')
	}

	navigator.geolocation.getCurrentPosition( (position) => {
		console.log(position);

		socket.emit('createLocationMessage', {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		})
	},
	() => {
		alert('Unable to fetch position');
	});
});