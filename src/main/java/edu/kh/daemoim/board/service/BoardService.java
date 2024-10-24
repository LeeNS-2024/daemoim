package edu.kh.daemoim.board.service;

import java.util.Map;

import edu.kh.daemoim.board.dto.Board;

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

	/** 게시글 상세 조회
	 * @param map
	 * @return
	 */
	Board selectDetail(Map<String, Integer> map);

	/** 조회수 1 증가
	 * @param boardNo
	 * @return
	 */
	int updateReadCount(int boardNo);

	/** 좋아요 체크 or 해제
	 * @param boardNo
	 * @param memberNo
	 * @return
	 */
	Map<String, Object> boardLike(int boardNo, int memberNo);

}
