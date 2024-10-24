package edu.kh.daemoim.siteManage.controlller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.daemoim.groupManage.dto.GroupManageDto;
import edu.kh.daemoim.groupManage.dto.GroupMemberManageDto;
import edu.kh.daemoim.siteManage.service.SiteManageService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("siteManage")
@RequiredArgsConstructor
public class SiteManageController {

	private final SiteManageService service;
	
	@GetMapping("")
	public String siteManage(Model model) {
		
		// 서비스 호출 후 결과 받아오기
		Map<String, Object> map = service.getSiteManage();

		// "groupAllcount" : 총 모임 수
		// "memberAllcount" : 총 회원수
		// "outMemberCount" : 정지된 계정 수
		// "todayEnrollCount" : 오늘 새로 가입한 회원 수
		Map<String, Integer> countList = (Map<String, Integer>) map.get("countList");
		
		// 모임조회 - 전체활동이 많았던 모임 5개
		List<GroupManageDto> groupList = (List<GroupManageDto>) map.get("groupList");

		// 회원조회 - 최근 가입한 회원 5개
		List<GroupMemberManageDto> memberList = (List<GroupMemberManageDto>) map.get("memberList");
		
		model.addAttribute("countList", countList);
		model.addAttribute("groupList", groupList);
		model.addAttribute("memberList", memberList);
		
		return "siteManage/main";
	}
	
	
}
