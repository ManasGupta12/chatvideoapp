// replace these values with those generated in your TokBox Account
var apiKey = "46314802";
var sessionId = "2_MX40NjMxNDgwMn5-MTU1NjAwNzY2MTI3Nn5hTDFEdkRIMkZFTTNxbjBZTWVxT21rNVZ-fg";
var token = "T1==cGFydG5lcl9pZD00NjMxNDgwMiZzaWc9YjBmYTYxZmMwOWFiYmJjMDFjMWM3YzdkM2NhNzRlODU1MTZhNTI2ZTpzZXNzaW9uX2lkPTJfTVg0ME5qTXhORGd3TW41LU1UVTFOakF3TnpZMk1USTNObjVoVERGRWRrUklNa1pGVFROeGJqQlpUV1Z4VDIxck5WWi1mZyZjcmVhdGVfdGltZT0xNTU2MDA3Njg4Jm5vbmNlPTAuODczNzIyNDQ3ODQxOTA5NyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTU4NTk5Njg0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
initializeSession();

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}