package edu.kh.daemoim.board.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.daemoim.board.dto.Board;

public interface EditBoardService {

	/** 게시글 작성
	 * @param inputBoard
	 * @param images
	 * @return
	 */
	int boardInsert(Board inputBoard, List<MultipartFile> images);

}
