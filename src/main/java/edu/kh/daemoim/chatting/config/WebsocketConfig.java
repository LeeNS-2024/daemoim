package edu.kh.daemoim.chatting.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

import edu.kh.daemoim.chatting.handler.ChattingWebsocketHandler;
import edu.kh.daemoim.chatting.handler.MemberWebsocketHandler;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebsocketConfig implements WebSocketConfigurer{

	private final HandshakeInterceptor interceptor;
	
	private final ChattingWebsocketHandler chattingHandler;
	private final MemberWebsocketHandler memberHandler;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		
		registry.addHandler(chattingHandler, "/chatsocket")
				.addInterceptors( interceptor )
				.setAllowedOriginPatterns(
						"http://localhost/",
						"http://192.168.219.105/")
				.withSockJS();
		
		registry.addHandler(memberHandler, "/memsocket")
		.addInterceptors( interceptor )
		.setAllowedOriginPatterns(
				"http://localhost/",
				"http://192.168.219.105/")
		.withSockJS();
		
	}
	
	

}
