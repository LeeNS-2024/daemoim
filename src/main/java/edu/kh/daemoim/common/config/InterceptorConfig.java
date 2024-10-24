package edu.kh.daemoim.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import edu.kh.daemoim.common.interceptor.GroupHeaderImgInterceptor;
import edu.kh.daemoim.common.interceptor.GroupManageInterceptor;
import edu.kh.daemoim.common.interceptor.BoardTypeInterceptor;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer{
	
	
	@Bean // 메서드에서 반환된 객체를 Bean으로 등록
	public BoardTypeInterceptor boardTypeInterceptor() {
		return new BoardTypeInterceptor();
	}
	
	@Bean
	public GroupManageInterceptor groupManageInterceptor() {
		return new GroupManageInterceptor();
	}
	
	@Bean
	public GroupHeaderImgInterceptor groupHeaderImgInterceptor() {
		return new GroupHeaderImgInterceptor();
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		registry.addInterceptor( groupManageInterceptor() )
				.addPathPatterns("/groupManage/**", "/groupMemberManage/**");
		
		registry.addInterceptor( groupHeaderImgInterceptor() )
		.addPathPatterns("/groupMain/**", "/board/**");
		
		// BoardTypeInterceptor Bean을 인터셉터로 등록
		registry.addInterceptor(boardTypeInterceptor())
			      .addPathPatterns("/**")
			      .excludePathPatterns("/css/**", "/js/**");
		
	}

}
