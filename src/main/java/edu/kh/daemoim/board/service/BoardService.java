package edu.kh.daemoim.board.service;

import java.util.Map;

public interface BoardService {

	/** 게시글 목록 조회
	 * @param boardCode
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectBoardList(int boardTypeCode, int cp);

}
