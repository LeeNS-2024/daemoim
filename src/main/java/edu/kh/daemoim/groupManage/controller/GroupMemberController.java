package edu.kh.daemoim.groupManage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.kh.daemoim.groupManage.dto.GroupManageDto;
import edu.kh.daemoim.groupManage.dto.GroupMemberManageDto;
import edu.kh.daemoim.groupManage.dto.ManagePagination;
import edu.kh.daemoim.groupManage.mapper.GroupManageMapper;
import edu.kh.daemoim.groupManage.service.GroupManageService;
import edu.kh.daemoim.groupManage.service.GroupMemberService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("groupMemberManage")
@RequiredArgsConstructor
public class GroupMemberController {
	
	private final GroupMemberService service;
	private final GroupManageService groupService;
	
	/** 모임관리페이지로 이동
	 * @param groupNo : 모임번호
	 * @param model : 모임에 가입된 회원들을 담을 객체
	 * @return
	 */
	@GetMapping("{groupNo:[0-9]+}/memberManage")
	public String memberManage(
			@PathVariable("groupNo") int groupNo,
			@RequestParam Map<String, Object> paramMap,
			Model model) {
		
		paramMap.put("groupNo", groupNo);
		// 모임 멤보조회 호출
		Map<String, Object> map = service.getMemberList(paramMap);
		
		List<GroupMemberManageDto> memberList = (List<GroupMemberManageDto>)map.get("memberList");
		int memberAllCount = (int)map.get("memberAllCount");
		ManagePagination pagination = (ManagePagination)map.get("pagination");
		
		// 그룹 정보 담기
		GroupManageDto group = groupService.selectGroup(groupNo);
		model.addAttribute("group", group);
		model.addAttribute("memberList", memberList);
		model.addAttribute("memberAllCount", memberAllCount);
		model.addAttribute("pagination", pagination);
		
		return "groupManage/manageGroupMember";
	}
}
