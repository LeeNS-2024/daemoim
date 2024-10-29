package edu.kh.daemoim.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.daemoim.board.dto.Board;
import edu.kh.daemoim.board.dto.BoardImg;

@Mapper
public interface EditBoardMapper {

	/** 게시글 부분(제목, 내용, 작성자, 게시판 종류) DB에 추가
	 * @param inputBoard
	 * @return
	 */
	int boardInsert(Board inputBoard);

	
	/** 여러이미지 한 번에 DB에 추가
	 * @param uploadList
	 * @return
	 */
	  int insertUploadList(List<BoardImg> uploadList);
	 
}
