package edu.kh.daemoim.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.daemoim.board.mapper.BoardMapper;
import edu.kh.daemoim.board.dto.Board;
import edu.kh.daemoim.board.dto.Pagination;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

	private final BoardMapper mapper;
	
	@Override
	public Map<String, Object> selectBoardList(int boardTypeCode, int cp) {
		
		int listCount = mapper.getListCount(boardTypeCode);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int limit = pagination.getLimit(); // 10
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Board> boardList = mapper.selectBoardList(boardTypeCode, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		
		return map;
	}
	
	// 검색 목록 조회
	@Override
	public Map<String, Object> selectSearchList(int boardTypeCode, int cp, Map<String, Object> paramMap) {
		
		// 1. 지정된 게시판에서 검색 조건이 일치하는 게시글이 
		//    몇 개나 존재하는지 조회
		
		paramMap.put("boardCode", boardTypeCode); // boardCode도 paramMap에 추가
		
		int searchCount = mapper.getSearchCount(paramMap);
		
		
	  // 2.Pagination 객체 생성하기 
		Pagination pagination = new Pagination(cp, searchCount);
		
		//3. DB에서 cp(조회 하려는 페이지)에 해당하는 행을 조회
		int limit = pagination.getLimit(); // 10
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		
		// 4. 검색 결과 + Pagenation 객체를 Map으로 묶어서 반환
		List<Board> boardList = mapper.selectSearchList(paramMap, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		
		return map;
	}
	
}
