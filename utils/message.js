var generateMess=(from,text)=>{
return {
		from,
		text,
		
	};
};
var generateLocationMessage=(from,latitude,longitude)=>{

return {
  from,
  url:`https://www.google.com/maps?q=${latitude},${longitude}`,
  
};
};
module.exports={generateMess,generateLocationMessage};
