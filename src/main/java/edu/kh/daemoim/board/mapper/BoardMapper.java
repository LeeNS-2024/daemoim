package edu.kh.daemoim.board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.daemoim.board.dto.Board;

@Mapper
public interface BoardMapper {

	/** boardCode가 일치하는 게시글 중 삭제되지 않은 게시글 수 조회
	 * @param boardCode
	 * @return listCount
	 */
	int getListCount(int boardTypeCode);

	/** 지정된 페이지 분량의 게시글 목록 조회
	 * @param boardCode
	 * @param rowBounds
	 * @return boardList
	 */
	List<Board> selectBoardList(int boardTypeCode, RowBounds rowBounds);

	/** 검색 조건이 맞는 게시글 수 조회
	 * @param paramMap
	 * @return cp
	 */
	int getSearchCount(Map<String, Object> paramMap);

	/** 검색 목록 조회
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Board> selectSearchList(Map<String, Object> paramMap, RowBounds rowBounds);

}
