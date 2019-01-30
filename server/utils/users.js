// [{
// 	id: 'sdfss',
// 	name: 'Vladyslav',
// 	room: 'node js'
// }]

class Users {
	constructor(){
		this.users = [];
	}

	addUser(id, name, room){
		let user = {id, name, room};
		this.users.push(user);
		return user;
	}
	getUserList(room){
		let users = this.users.filter((user) => user.room === room);
		let namesArray = users.map((user) => user.name);

		return namesArray;
	}
	getUser(id){
		return this.users.filter((user) => user.id === id)[0];
	}
	removeUser(id){
		let user = this.getUser(id);
		if(user){
			this.users = this.users.filter((user) => user.id !== id);
		}
		return user;
	}

}

// let me = new Users('Vladyslav', 20, 'Node room!');
// let me = new Users();
// me.addUser(1, 'Vlad', 'test');
// me.addUser(2, 'Boris', 'test2');
// me.addUser(3, 'Dima', 'test2');
// console.log(me.users.length);
// me.removeUser(2);
// console.log(me.users.length);

module.exports = {Users}