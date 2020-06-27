package com.OnetoManyComm.demo;

import org.kurento.client.KurentoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer{
	//Create a new Kurento Client
	@Bean
	public KurentoClient kurentoClient(){
		return KurentoClient.create();
	}
	//Register a new message handler at the URL that will be decided in the client-side
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new SocketHandler(), "/socket").setAllowedOrigins("*");
	}

}
