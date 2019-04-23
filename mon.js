const mongoose=require('mongoose');
var  Schema=mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/chatapp',{
	useNewUrlParser:true,
	useCreateIndex:true
});
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection Successful!");


var chatschema=new Schema({
	name:String,
	message:String,
	created:{type:Date,default:Date.now}
});
var chat=mongoose.model('Message',chatschema);
module.exports=chat;
});
 

