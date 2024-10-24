package edu.kh.daemoim.board.service;

import java.util.List;
import java.util.Map;

public interface BoardService {

	/** 게시글 목록 조회
	 * @param groupNo
	 * @param boardTypeCode
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectBoardList(int groupNo, int boardTypeCode, int cp);

	/** 검색 목록 조회
	 * @param groupNo
	 * @param boardTypeCode
	 * @param cp
	 * @param paramMap
	 * @return
	 */
	Map<String, Object> selectSearchList(int groupNo, int boardTypeCode, int cp, Map<String, Object> paramMap);

	/** DB에서 모든 게시판 종류를 조회
	 * @return
	 */
	List<Map<String, String>> selectBoardTypeList();
}
