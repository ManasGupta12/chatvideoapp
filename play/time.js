var moment=require('moment');


var someTime=moment().valueOf();
var createdAt=1234
var date=moment(createdAt);
console.log(someTime);
console.log(date.format('h:mm A'));