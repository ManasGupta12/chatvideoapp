
var socket=io();
  
 function scrolltobottom(){
  var messages=jQuery('#messages');
  var newmess=messages.children('li:last-child');
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newmessheight=newmess.innerHeight();
  var lastmessheight=newmess.prev().innerHeight();

  if(clientHeight + scrollTop + newmessheight + lastmessheight >=scrollHeight ){
    messages.scrollTop(scrollHeight);
  }
 }

  socket.on('connect',function(){
 var params=jQuery.deparam(window.location.search);


 socket.emit('join',params,function(err){
  if(err){
    alert(err);
    window.location.href='/';
  }
 else{
 console.log('No error');
 }
 });
 
 
  
  });
  socket.on('disconnect',function(){
    console.log('disconnected from the server');
  });

    socket.on('updateUserList',function(users){
      var ol=jQuery('<ol></ol>');

      users.forEach(function (user){
        ol.append(jQuery('<li></li>').text(user));
      });
      jQuery('#users').html(ol);
    })

    
   socket.on('newMessage',function(mess){
    var formattime=moment(mess.createdAt).format('h:mm a');
    var template=jQuery("#message-template").html();
    var html=Mustache.render(template,{
      text:mess.text,
      from:mess.from,
      createdAt:formattime
    });
    jQuery('#messages').append(html);
    scrolltobottom();
    
    
   });

   socket.on('newLocationMessage',function(mess){
    var formattime=moment(mess.createdAt).format('h:mm a');
    var template=jQuery("#location-message-template").html();
    var html=Mustache.render(template,{
        from:mess.from,
        url:mess.url,
      createdAt:formattime
    });
    jQuery('#messages').append(html);
    scrolltobottom();
    
  });
 
var messagetext=jQuery('[name=Message]');

jQuery('#Message-form').on('submit',function(e){
 e.preventDefault();

 socket.emit('newCreateMessage',{
  text:messagetext.val(),
 },function(){
 messagetext.val('');
 });
});
var locButton=jQuery('#send-location');
locButton.on('click',function(){
if(!navigator.geolocation){
  return alert('Geolocation not supported by user');
}
locButton.attr('disabled','disabled').text('Sending location .....');

navigator.geolocation.getCurrentPosition( function (position) {
  locButton.removeAttr('disabled').text('Send location');
socket.emit('createLocationMessage',{
  latitude:position.coords.latitude,
  longitude:position.coords.longitude
});
},function(){
  locButton.removeAttr('disabled').text('Send location');
  alert('Unable to fetch location');
});
});



