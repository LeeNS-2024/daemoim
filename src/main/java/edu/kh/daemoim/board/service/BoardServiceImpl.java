package edu.kh.daemoim.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.daemoim.board.mapper.BoardMapper;
import edu.kh.daemoim.groupMain.dto.Schedule;
import edu.kh.daemoim.board.dto.Board;
import edu.kh.daemoim.board.dto.Pagination;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

	private final BoardMapper mapper;

	
	// 게시글 목록 조회
	@Override
	public Map<String, Object> selectBoardList(int groupNo, int boardTypeCode, int cp) {
		
		int listCount = mapper.getListCount(groupNo, boardTypeCode);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		int limit = pagination.getLimit(); // 10
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Board> boardList = mapper.selectBoardList(groupNo, boardTypeCode, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		
		return map;
	}
	
	// 검색 목록 조회
	@Override
	public Map<String, Object> selectSearchList(int groupNo, int boardTypeCode, int cp, Map<String, Object> paramMap) {
		
		paramMap.put("boardTypeCode", boardTypeCode);
		paramMap.put("groupNo", groupNo);
		
		int searchCount = mapper.getSearchCount(paramMap);
		
		Pagination pagination = new Pagination(cp, searchCount);
		
		int limit = pagination.getLimit(); // 10
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Board> boardList = mapper.selectSearchList(paramMap, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		
		return map;
	}
	

	//DB에서 모든 게시판 종류를 조회
	@Override
	public List<Map<String, String>> selectBoardTypeList() {
		return mapper.selectBoardTypeList();
	}

	// 게시글 상세조회
	@Override
	public Board selectDetail(Map<String, Integer> map) {
		return mapper.selectDetail(map);
	}
	
	// 조회수 1 증가
	@Override
	public int updateReadCount(int boardNo) {
		return mapper.updateReadCount(boardNo);
	}
	
	// 일정 조회
	@Override
	public Map<String, Object> selectScheduleList(int groupNo) {
		
		List<Schedule> scheduleList = mapper.selectScheduleList(groupNo);
		
		Map<String, Object> map = new HashMap<>();
		map.put("scheduleList", scheduleList);
		
		return map;
		
	}
	
	// 일정 참석
	@Override
	public int attendSchedule(int scheduleNo, int groupNo, int memberNo) {
		return mapper.attendSchedule(scheduleNo, groupNo, memberNo);
	}
	
	// 일정 참석 취소
	@Override
	public int cancelSchedule(int scheduleNo, int groupNo, int memberNo) {
		return mapper.cancelSchedule(scheduleNo, groupNo, memberNo);
	}
	
	// 일정 생성
	@Override
	public int createSchedule(Map<String, Object> scheduleMap) {
		return mapper.createSchedule(scheduleMap);
	}

	

	
	
	
	
	
	
	
	
	
	
	
	

}
