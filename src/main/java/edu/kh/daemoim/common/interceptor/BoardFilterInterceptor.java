package edu.kh.daemoim.common.interceptor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import edu.kh.daemoim.common.interceptor.service.InterceptorService;
import edu.kh.daemoim.myPage.dto.MyPage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

// 모임게시판 접근제한
@Slf4j
public class BoardFilterInterceptor implements HandlerInterceptor {

	@Autowired
	private InterceptorService service;
	
	@Override
	public boolean preHandle(
			HttpServletRequest request,
			HttpServletResponse response,
			Object handler)
			throws Exception {
        
        MyPage loginMember = (MyPage)request.getSession().getAttribute("loginMember");
        String groupNo = request.getRequestURI().split("/")[2];
        
		if(groupNo != null && groupNo.matches("\\d+")) { // 숫자인 경우에만 시행
			List<Integer> memberList = service.getMemberNoList(groupNo);
			if(memberList.contains(loginMember.getMemberNo()) == false) {
				response.sendRedirect("/groupMain/" + groupNo);
				log.info("[보안] >> 회원_권한_페이지 : 리턴");
				return false;
			}
		}
        
        return true;
	}
}
