const expect=require('expect');

const {Users}=require('./users');

describe('Users',()=>{
var users;

    beforeEach(()=>{
     users=new Users();
     users.users=[{
     	id:'1',
			groupname:'my',
			name:'Brajesh',
            password:'123'
		},{
     	id:'2',
            groupname:'my',
            name:'Manas',
            password:'1233'
			
     },{
     	id:'3',
            groupname:'g',
            name:'Manan',
            password:'1123'
			
     }];
    });

	it('should add new user',()=>{
		var users=new Users();
		var user={
			id:'12334',
            groupname:'kl',
			name:'Manag',
			password:'321'
		};
		var resuser=users.addUser(user.id,user.groupname,user.name,user.password);
	 expect(users.users).toEqual([user]);
	});
    it('should remove user',()=>{
    var userid='1';
    var user=users.removeUser(userid);

    expect(user.id).toBe(userid);
    expect(users.users.length).toBe(2);
    });
    it('should not remove user',()=>{
    var userid='12';
    var user=users.removeUser(userid);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
    });
    it('should find user',()=>{
    var userid='2';
    var user=users.getUser(userid);
    expect(user.id).toBe(userid)
    });
    it('should not find user',()=>{
     var userid='23';
    var user=users.getUser(userid);
    expect(user).toNotExist();
    });



    it('should return users for my',()=>{
    	var userList=users.getUserList('my');
    	 expect(userList).toEqual(['Manan','Brajesh']);
    });
it('should return users for g',()=>{
    	var userList=users.getUserList('g');
    	 expect(userList).toEqual(['Manas']);
    });
});