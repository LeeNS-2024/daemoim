package edu.kh.daemoim.board.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.daemoim.board.service.BoardService;
import edu.kh.daemoim.myPage.dto.MyPage;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import edu.kh.daemoim.board.dto.Board;
import edu.kh.daemoim.board.dto.Pagination;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("board")
public class BoardController {
	
	private final BoardService service;
	
	@GetMapping("boardPage")
	public String boardPage() {
		return "board/boardList";
	}
	
	@GetMapping("boardSchedule")
	public String boardSchedulePage() {
		return "board/boardSchedule";
	}
	
	/** 게시글 목록 조회
	 * @param boardTypeCode : 게시판 종류 번호
	 * @param cp : 현재 조회하려는 목록의 페이지 번호
	 * 						 (필수 아님, 없으면 1)
	 * @param model : forward 시 데이터 전달하는 용도의 객체(request)
	 */
	@GetMapping("{groupNo:[0-9]+}/{boardTypeCode:[0-9]+}")
	public String selectBoardList(
		@PathVariable("boardTypeCode") int boardTypeCode,
		@PathVariable("groupNo") int groupNo,
		@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
		Model model,
		@RequestParam Map<String, Object> paramMap) {
		
		Map<String, Object> map = null;
		
		if(paramMap.get("key") == null) { // 일반 목록 조회
			map = service.selectBoardList(groupNo, boardTypeCode, cp);
		} else { // 검색 목록 조회
			map = service.selectSearchList(groupNo, boardTypeCode, cp, paramMap);
		}
	
		List<Board> boardList = (List<Board>)map.get("boardList");
		Pagination pagination = (Pagination)map.get("pagination");
		
		model.addAttribute("boardList", boardList);
		model.addAttribute("pagination", pagination);
		
		if(boardTypeCode == 3)
		return "/board/imgAlbumList";
		else
		return "/board/boardList :: list";
	}
	
	/** 게시글 상세 조회하기
	 * @param groupNo 			모임 번호
	 * @param boardTypeCode 게시판 종류
	 * @param boardNo				게시판 번호
	 * @param model					forward 시 request scope 값 전달 객체
	 * @param ra						redirect 시 request scope 값 전달 객체
	 * @param loginMember		로그인한 회원 정보
	 * @param req						요청관련 데이터를 담고있는 객체(쿠키 포함)
	 * @param resp					응답방법을 담고있는 객체(쿠키 생성, 쿠키를 클라리언트에게 전달)
	 * @throws ParseException
	 * @return
	 */
	@GetMapping("{groupNo:[0-9]+}/{boardTypeCode:[0-9]+}/{boardNo:[0-9]+}")
	public String boardDetail(
		@PathVariable("groupNo") 				int groupNo,
		@PathVariable("boardTypeCode") 	int boardTypeCode,
		@PathVariable("boardNo") 				int boardNo,
		Model model,
		RedirectAttributes ra,
		@SessionAttribute(value="loginMember", required=false) MyPage loginMember,
		HttpServletRequest req,
		HttpServletResponse resp
		) throws ParseException {
		
		Map<String, Integer> map = new HashMap<>();
		map.put("groupNo", groupNo);
		map.put("boardTypeCode", boardTypeCode);
		map.put("boardNo", boardNo);
		
		if(loginMember != null)  map.put("memberNo", loginMember.getMemberNo());
		
		Board board = service.selectDetail(map);
		
		if(board == null) {
			ra.addFlashAttribute("message", "게시글이 존재하지 않습니다");
			return "redirect/board/" + groupNo + "/" + boardTypeCode;
		}
		
		// 조회수 증가
		
	  if(loginMember == null || loginMember.getMemberNo() != board.getMemberNo()) {
	  	
	  	Cookie[] cookies = null;
	  	Cookie c = null;
	  	
	  	if(req.getCookies() != null) {
	  		cookies = req.getCookies();
	  		
	  		for(Cookie temp : cookies) {
	  			if(temp.getName().equals("readBoardNo")) {
	  				c = temp;
	  				break;
	  			}
	  		}
	  	}
	  
		  int result = 0;
		  
		  if(c == null) {
		  	c = new Cookie("readBoardNo", "[" + boardNo + "]");
		  	/* DB에서 해당 게시글의 조회수를 1 증가 시키는 서비스 호출 */
		  	result = service.updateReadCount(boardNo);
		  }
		  else {
		  	if(c.getValue().contains(boardNo + "") == false) {
					c.setValue(c.getValue() + "[" + boardNo + "]");
					// DB에서 조회수 증가
					result = service.updateReadCount(boardNo);
					}
		  }
		  // 조회수가 증가된 경우 쿠키세팅(하루에 한 번 조회수 늘릴 수 있게 / 없어도 됨 주석으로 만들어둠)
		  /*
		  if(result > 0){
		  	board.setReadCount(board.getReadCount() + 1);
		  	c.setPath("/");
		  	
		  	Calendar cal = Calendar.getInstance();
		  	
		  	cal.add(cal.DATE, 1);
		  	
		  	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		  	
		  	Date currentDay = new Date();
		  	Date b = new Date(cal.getTimeInMillis());
		  	Date nextDay = sdf.parse(sdf.format(b));
		  	
		  	long diff = (nextDay.getTime() - currentDay.getTime()) / 1000;
		  	
		  	c.setMaxAge((int)diff);
		  	resp.addCookie(c);
		  }
		  */
	  }
	  
		if(boardTypeCode == 3)
		return "board/imageAlbumDetail";
		else
		return "board/boardDetail";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
