package edu.kh.daemoim.board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import edu.kh.daemoim.board.dto.Board;

@Mapper
public interface BoardMapper {

	/** groupNo와 boardTypeCode가 일치하고 게시물 중 삭제되지 않은 게시글 수 조회
	 * @param groupNo
	 * @param boardTypeCode
	 * @return
	 */
	int getListCount(@Param("groupNo") 			 int groupNo, 
									 @Param("boardTypeCode") int boardTypeCode);

	/** 지정된 페이지 분량의 게시글 목록 조회
	 * @param groupNo
	 * @param boardTypeCode
	 * @param rowBounds
	 * @return
	 */
	List<Board> selectBoardList(@Param("groupNo")				int groupNo,
															@Param("boardTypeCode")	int boardTypeCode, 
															@Param("rowBounds")			RowBounds rowBounds);

	/** 검색조건이 맞는 게시글 수 조회
	 * @param paramMap
	 * @return
	 */
	int getSearchCount(Map<String, Object> paramMap);

	/** 검색 목록 조회
	 * @param paramMap
	 * @param rowBounds
	 * @return
	 */
	List<Board> selectSearchList(Map<String, Object> paramMap, RowBounds rowBounds);
	
	/** DB에서 모든 게시판 종류를 조회
	 * @return
	 */
	List<Map<String, String>> selectBoardTypeList();

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

}
