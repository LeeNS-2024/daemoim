package edu.kh.daemoim.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import edu.kh.daemoim.common.interceptor.GroupManageInterceptor;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer{
	
	@Bean
	public GroupManageInterceptor groupManageInterceptor() {
		return new GroupManageInterceptor();
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		registry.addInterceptor( groupManageInterceptor() )
				.addPathPatterns("/groupManage/**", "/groupMemberManage/**");
	}

}
