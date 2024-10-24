package edu.kh.daemoim.common.interceptor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import edu.kh.daemoim.board.dto.Comment;
import edu.kh.daemoim.groupManage.service.GroupManageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class GroupHeaderImgInterceptor implements HandlerInterceptor {
	
	@Autowired
	private GroupManageService service;
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
		String url = request.getRequestURI();
			// /groupMemberManage/{groupNo}/**
		String groupNo = url.split("/")[2];
			// {boardNo}
		
		if(groupNo != null && groupNo.matches("\\d+")) { // 숫자인 경우에만 시행
			// 모임 상단이미지 덮어쓰기
			String groupHeaderImg = service.getGroupHeaderImg(groupNo);
			
			request.setAttribute("groupHeaderImg", groupHeaderImg);
		}
		
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}

}
