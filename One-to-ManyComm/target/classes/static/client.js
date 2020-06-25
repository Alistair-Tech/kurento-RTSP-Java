var connection = new WebSocket("ws://127.0.0.1:8080/socket");
var video;
var webRtcPeer;
var presenterButton = document.getElementById("presenter");
var viewerButton = document.getElementById("viewer");
var stopButton = document.getElementById("stop");

connection.onopen = () => {
	alert("Successfully opened connection.");
};

window.onload = () => {
	alert("Working");
	video = document.getElementsByTagName("video")[0];
	stopButton.disabled = true;
	/*presenterButton.disabled = false;
	viewerButton.disabled = false;
	stopButton.disabled = true;*/
};

window.onbeforeunload = function() {
	connection.close();
};

connection.onclose = () => {
	alert("Successfully closed connection.");
};


/*function disableStopButton() {
	enableButton('#presenter', 'presenter()');
	enableButton('#viewer', 'viewer()');
	disableButton('#stop');
}

function enableStopButton() {
	disableButton('#presenter');
	disableButton('#viewer');
	enableButton('#stop', 'stop()');
}

function disableButton(id) {
	$(id).attr('disabled', true);
	$(id).removeAttr('onclick');
}

function enableButton(id, functionName) {
	$(id).attr('disabled', false);
	$(id).attr('onclick', functionName);
}*/

/*
connection.onmessage = function(message) {
	var parsedMessage = JSON.parse(message.data);
	alert('Received message: ' + message.data);

	switch (parsedMessage.id) {
	case 'presenterResponse':
		presenterResponse(parsedMessage);
		break;
	case 'viewerResponse':
		viewerResponse(parsedMessage);
		break;
	case 'iceCandidate':
		webRtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
			if (error)
				alert('Error adding candidate: ' + error);
		});
		break;
	case 'stopCommunication':
		dispose();
		break;
	default:
		alert('Unrecognized message', parsedMessage);
	}
}

function presenterResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		alert('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} 
	else {
		webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
			if (error)
				alert(error);
		});
	}
}
function viewerResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		alert('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} 
	else {
		webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
			if (error)
				alert(error);
		});
	}
}

function presenter() {
	if (!webRtcPeer) {
		//showSpinner(video);

		var options = {
			localVideo : video,
			onicecandidate : onIceCandidate
		}
		webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
					if (error) {
						alert(error);
						return;
					}
					webRtcPeer.generateOffer(onOfferPresenter);
				});

		enableStopButton();
	}
}

function onOfferPresenter(error, offerSdp) {
	if (error){
		alert('Error generating the offer');
		return;
	}
	alert('Invoking SDP offer callback function 127.0.0.1");
	var message = {
		id : 'presenter',
		sdpOffer : offerSdp
	}
	sendMessage(message);
}

function viewer() {
	if (!webRtcPeer) {
		//showSpinner(video);

		var options = {
			remoteVideo : video,
			onicecandidate : onIceCandidate
		}
		webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error) {
					if (error) {
						alert(error);
						return ;
					}
					this.generateOffer(onOfferViewer);
				});

		enableStopButton();
	}
}

function onOfferViewer(error, offerSdp) {
	if (error){
		alert('Error generating the offer');
		return;
	}
	alert('Invoking SDP offer callback function 127.0.0.1');
	var message = {
		id : 'viewer',
		sdpOffer : offerSdp
	}
	sendMessage(message);
}

function onIceCandidate(candidate) {
	console.log("Local candidate" + JSON.stringify(candidate));

	var message = {
		id : 'onIceCandidate',
		candidate : candidate
	};
	sendMessage(message);
}

function stop() {
	var message = {
		id : 'stop'
	}
	sendMessage(message);
	dispose();
}

function dispose() {
	if (webRtcPeer) {
		webRtcPeer.dispose();
		webRtcPeer = null;
	}
	//hideSpinner(video);

	disableStopButton();
}


function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	alert('Sending message: ' + jsonMessage);
	connection.send(jsonMessage);
}

/*function showSpinner() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].poster = './img/transparent-1px.png';
		arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
	}
}

function hideSpinner() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].src = '';
		arguments[i].poster = './img/webrtc.png';
		arguments[i].style.background = '';
	}
}*/