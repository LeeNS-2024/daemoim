package edu.kh.daemoim.common.filter;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginFilter implements Filter {

	@Override
	public void doFilter(
			ServletRequest request,
			ServletResponse response,
			FilterChain chain)
			throws IOException, ServletException {

		// 다운 캐스팅
		HttpServletRequest  req =  (HttpServletRequest)  request;
		HttpServletResponse resp = (HttpServletResponse) response;
		
		HttpSession session = req.getSession();
		if ( session.getAttribute("loginMember") == null ) {
			// 없다면
			resp.sendRedirect("/");
			log.info("[보안] >> 로그인_권한_페이지 : 리턴");
		} else {
			chain.doFilter(request, response);
		}
		
		
	}
}
