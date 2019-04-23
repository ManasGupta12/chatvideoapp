const expect=require('expect');

const {isRealString}=require('./validator');
describe('isRealString',()=>{
	it('should reject non-string values',()=>{
		var res=isRealString(55);
		expect(res).toBe(false);
	});
	it('should reject eith only spaces',()=>{
		var res=isRealString( '     ');
		expect(res).toBe(false);
	});
	it('should allow nonspace characters',()=>{
		var res=isRealString(' Manas ');
		expect(res).toBe(true);
	});
});