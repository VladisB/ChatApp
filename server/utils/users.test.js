const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	let users; 

	beforeEach(()=>{
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Vlad',
			room: 'The room'
		},
		{
			id: '2',
			name: 'Dmitry',
			room: 'Vikings'
		},
		{
			id: '3',
			name: 'Jisus',
			room: 'Nodejs'
		}
		];
	});

	it('should add new user', () => {
		let users = new Users();
		let user = {
			id: "sdadad",
			name: "Vladyslav",
			room: 'The Node room'
		};

		let reUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should return names for the Vikings room', () => {
		let userList = users.getUserList('Nodejs');
		expect(userList).toEqual(['Jisus']);
	});

	it('should found a user', () => {
		let userID = '2',
				user = users.getUser(userID);

		expect(user.id).toBe(userID);
	});

	it('should not remove a user', () => {
		let userID = '133',
				user = users.removeUser(userID);

		expect(user).toBeUndefined();
		expect(users.users.length).toBe(3);
	});

	it('should remove a user', () => {
		let userID = '2',
				user = users.removeUser(userID);

		expect(user.id).toBe(userID);
		expect(users.users.length).toBe(2);
	});
});