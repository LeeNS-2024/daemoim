package edu.kh.daemoim.board.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.daemoim.board.service.BoardService;
import edu.kh.daemoim.board.service.EditBoardService;
import edu.kh.daemoim.myPage.dto.MyPage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("editBoard")
public class EditBoardController {

	private final EditBoardService service;

	private final BoardService boardService;

	/**
	 * 게시글 작성 화면으로 전환
	 * 
	 * @param groupNo
	 * @param boardTypeCode
	 * @return
	 */
	@GetMapping("{groupNo:[0-9]+}/{boardTypeCode:[0-9]+}/insert")
	public String boardInsert(@PathVariable("groupNo") int groupNo, @PathVariable("boardTypeCode") int boardTypeCode) {

		if (boardTypeCode == 3)
			return "/board/imageAlbumWrite";
		else
			return "/board/boardWrite";
	}

	/**
	 * 게시글 등록하기
	 * 
	 * @param groupNo
	 * @param boardTypeCode
	 * @param inputBoard
	 * @param loginMember
	 * @param images
	 * @param ra
	 * @return
	 */
	@PostMapping("{groupNo:[0-9]+}/{boardTypeCode:[0-9]+}/insert")
	@ResponseBody
	public String boardInsert(@PathVariable("groupNo") int groupNo, @PathVariable("boardTypeCode") int boardTypeCode,
			@ModelAttribute edu.kh.daemoim.board.dto.Board inputBoard, @SessionAttribute("loginMember") MyPage loginMember,
			@RequestParam("images") List<MultipartFile> images, RedirectAttributes ra) {

		inputBoard.setMemberNo(loginMember.getMemberNo());

		int boardNo = service.boardInsert(inputBoard, images);
		String path = null;
		String message = null;

		if (boardNo == 0) {
			path = "insert";
			message = "게시글작성을 실패하였습니다";
		} else {
			path = "/board/" + groupNo + "/" + boardTypeCode + "/" + boardNo;
			message = "게시글이 작성되었습니다";
		}
		ra.addFlashAttribute("message", message);

		return "redirect:" + path;

	}

}
