package edu.kh.daemoim.groupManage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.daemoim.groupManage.service.GroupManageService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("groupManage")
@Controller
public class GroupManageController {
	
	private final GroupManageService service;
	
	/** 모임생성 페이지로 이동
	 * @return
	 */
	@GetMapping("createGroup")
	public String createGroup() {
		
		// 비로그인 회원 메인화면으로 리다이랙트하는 구문 추가
		// 카테고리, 카테고리리스트 모델에 추가
		return "groupManage/createGroup";
	}
	
	/** 모임 이름 중복 검사
	 * @param inputName : 입력받은 이름 
	 * @return 1: 중복있음, 0:중복없음
	 */
	@ResponseBody
	@GetMapping("groupNameCheck")
	public int groupNameCheck(
			@RequestParam("inputName") String inputName) {
		return service.groupNameCheck(inputName);
	}

}
