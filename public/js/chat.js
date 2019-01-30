let socket = io();

function scrollToButtom(){
	let messages = document.querySelector('#messages').lastElementChild;
	messages.scrollIntoView();
}

socket.on('connect', ()=> {
	console.log('Connected to server');
	let searchQuery = window.location.search.substring(1);
	let params = JSON.parse('{"'+ decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, '" "').replace(/=/g, '":"') +'"}');

	socket.emit('join', params, (err) => {
		if(err){
			alert(err);
			// alert('Input fields must valid');
			window.location.href = '/';
		}else{
			console.log('no error');
		}
	})
});
socket.on('disconnect', ()=> {
	console.log('disconnected from server');
});

socket.on('updateUserList', (users) =>{
	let ol = document.createElement('ol');
	users.forEach(user => {
		let li = document.createElement('li');
		li.innerHTML = user;
		ol.appendChild(li);
	});

	let userList = document.querySelector('#users');
	userList.innerHTML = "";
	userList.appendChild(ol);
})

socket.on('newMessage', (message) => {
	const formattedTime = moment(message.createdAt).format('LT');
	const template = document.querySelector('#message-template').innerHTML;
	const html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	});

	const div = document.createElement('div');
	div.innerHTML = html;
	document.querySelector(`#messages`).appendChild(div);
	scrollToButtom();

	// console.log('New Message!', message);
	// let formattedTime = moment(message.createdAt).format('LT');
	// let li = document.createElement('li');
	// li.innerText = `${message.from} ${formattedTime} : ${message.text}`;

	// document.querySelector('#messages').appendChild(li);
	
});
socket.on('newLocationMessage', (message) => {
	
	const formattedTime = moment(message.createdAt).format('LT');
	const template = document.querySelector('#message-location-template').innerHTML;
	const html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	const div = document.createElement('div');
	div.innerHTML = html;
	document.querySelector(`#messages`).appendChild(div);
	scrollToButtom();
	// console.log('New newLocationMessage!', message);
	// let li = document.createElement('li');
	// let a = document.createElement('a');
	// let formattedTime = moment(message.createdAt).format('LT');
	// li.innerText = `${message.from} ${formattedTime} : `;
	// a.setAttribute('target', '_blank');
	// a.setAttribute('href', message.url);
	// a.innerText= 'My current location';
	// li.appendChild(a);

	// document.querySelector('#messages').appendChild(li);
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