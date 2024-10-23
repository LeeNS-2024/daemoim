package edu.kh.daemoim.groupManage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.daemoim.board.dto.Board;
import edu.kh.daemoim.groupManage.dto.GroupManageDto;
import edu.kh.daemoim.groupManage.dto.ManageCategory;
import edu.kh.daemoim.groupManage.service.GroupManageService;
import jakarta.servlet.annotation.MultipartConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RequestMapping("groupManage")
@Controller
@Slf4j
public class GroupManageController {
	
	private final GroupManageService service;
	
	/** 모임생성 페이지로 이동
	 * @return
	 */
	@GetMapping("createGroup")
	public String createGroup(Model model) {
		
		List<ManageCategory> categoryArr = service.getCategoryArr();
		model.addAttribute("categoryArr", categoryArr);
		
		// 비로그인 회원 메인화면으로 리다이랙트하는 구문 추가
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
	
	/** 모임 카테고리 선택시 카테고리 리스트 반환하는 메서드
	 * @param categoryNo : 선택한 카테고리 넘버
	 * @return categoryList
	 */
	@ResponseBody
	@GetMapping("/{groupNo:[0-9]+}/getCategoryList")
	public List<ManageCategory> getCategoryList(
			@RequestParam("categoryNo") int categoryNo ){
		return service.getCategoryList(categoryNo);
	}
	
	/** 그룹 생성
	 * @param inputGroup : 생성할 그룹의 정보를 담은 객체
	 * @param groupImg : 그룹의 이미지 정보가 담긴 객체
	 * @return
	 */
	@PostMapping("createGroup")
	public String createGroup(
			@ModelAttribute GroupManageDto inputGroup,
			@RequestParam("groupImg") MultipartFile groupImg) {
		System.out.println("연결확인");
		// 이미지, 가입제한사항 빼고 다들어갈거임
		// 모임이름, 소개, 카테고리넘버, 카테고리리스트넘버

		// 세션에서 로그인한 멤버의 멤버넘를 받아와 input그룹에 저장
		inputGroup.setMemberNo(1);
		
		System.out.println(inputGroup.toString());
		int result = service.createGroup(inputGroup, groupImg);
		
		if(result == 0) {
			
		}
		return "redirect:/";
	}
	
	/** 모임 관리- 상세정보수정 페이지로 이동
	 * @return
	 */
	@GetMapping("{groupNo:[0-9]+}/manageGroup")
	public String manageGroup(
			@PathVariable("groupNo") int groupNo,
			Model model) {
		
		// 모임정보 불러오기
		GroupManageDto group = service.selectGroup(groupNo);
		
		// 전달받은 모임정보를 전달하기위해 세팅
		model.addAttribute("group", group);
		
		// 카테고리리스트 세팅
		List<ManageCategory> categoryArr = service.getCategoryArr();
		model.addAttribute("categoryArr", categoryArr);
		
		return "groupManage/manageGroup";
	}
	
	
	/** 모임 상세정보 수정하기
	 * @param updateGroup : 수정할 모임정보
	 * @param images : 대표, 해더 이미지
	 * @param deleteOrderList : 삭제한 이미지 순서
	 * @return
	 */
	@PostMapping("{groupNo:[0-9]+}/manageGroup")
	public String updateGroup(
			@ModelAttribute GroupManageDto updateGroup,
			@RequestParam("inputImg") List<MultipartFile> images,
			@RequestParam("deleteOrderList") List<Integer> deleteOrderList) {
		
		int result = service.updateGroup(updateGroup, images, deleteOrderList);
		
		String path = null;
		if(result > 0) {
			path = "redirect:/groupMain";
		} else {
			path = "redirect:/groupManage/" + updateGroup.getGroupNo() + "/manageGroup";
		}
		
		return path;
	}
	
	
	/** 공지사항 관리페이지 들어가기
	 * @return
	 */
	@GetMapping("{groupNo:[0-9]+}/manageOrder")
	public String manageOrder(
			Model model,
			@PathVariable("groupNo") int groupNo) {
		
		// 모임정보 불러오기
		GroupManageDto group = service.selectGroup(groupNo);
		
		// 전달받은 모임정보를 전달하기위해 세팅
		model.addAttribute("group", group);
		
		// 공지글 불러오기
		List<Board> boardList = service.getOrderBoard(groupNo);
		
		// 공지사항 세팅
		model.addAttribute("boardList", boardList);
				
		return "groupManage/manageOrder";
	}
	
	/** 최근글 관리페이지 들어가기
	 * @return
	 */
	@GetMapping("{groupNo:[0-9]+}/recentBoard")
	public String recentBoard(
			Model model,
			@PathVariable("groupNo") int groupNo) {
		
		// 모임정보 불러오기
		GroupManageDto group = service.selectGroup(groupNo);
		
		// 전달받은 모임정보를 전달하기위해 세팅
		model.addAttribute("group", group);
		
		// 최근 게시글 불러오기
		List<Board> boardList = service.getRecentBoard(groupNo);
		
		// 최근 게시글 세팅
		model.addAttribute("boardList", boardList);
		
		return "groupManage/manageRecentBoard";
	}
	
	/** 인기글 관리페이지 들어가기
	 * @param period : 조회할 기간
	 * @return
	 */
	@GetMapping("{groupNo:[0-9]+}/popularBoard")
	public String popularBoard(
			Model model,
			@PathVariable("groupNo") int groupNo,
			@RequestParam(name="period", required=false, defaultValue="30") int period ) {
		
		// 모임정보 불러오기
		GroupManageDto group = service.selectGroup(groupNo);
		
		// 전달받은 모임정보를 전달하기위해 세팅
		model.addAttribute("group", group);
		
		// 인기글 불러오기
		List<Board> boardList = service.getPopularBoard(groupNo, period);
		
		// 인기글 세팅
		model.addAttribute("boardList", boardList);
		model.addAttribute("period", period);
		
		return "groupManage/managePopularBoard";
	}
	

}
