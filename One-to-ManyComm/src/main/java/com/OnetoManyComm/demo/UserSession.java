package com.OnetoManyComm.demo;

import java.io.IOException;

import org.kurento.client.IceCandidate;
import org.kurento.client.WebRtcEndpoint;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.JsonObject;

public class UserSession {
	private final WebSocketSession session;
	private WebRtcEndpoint webRtcEndpoint;
	
	public UserSession(WebSocketSession session) {
		this.session = session;
	}
	
	public WebSocketSession getSession() {
		return session;
	}
	
	public void sendMessage(JsonObject message) throws IOException {
		session.sendMessage(new TextMessage(message.toString()));
	}

	public WebRtcEndpoint getWebRtcEndpoint() {
		return webRtcEndpoint;
	}

	public void setWebRtcEndpoint(WebRtcEndpoint webRtcEndpoint) {
		this.webRtcEndpoint = webRtcEndpoint;
	}

	public void addCandidate(IceCandidate candidate) {
		webRtcEndpoint.addIceCandidate(candidate);
	}
}
