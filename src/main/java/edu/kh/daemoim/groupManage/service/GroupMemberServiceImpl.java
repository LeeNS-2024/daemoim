package edu.kh.daemoim.groupManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.daemoim.groupManage.dto.GroupMemberManageDto;
import edu.kh.daemoim.groupManage.dto.ManagePagination;
import edu.kh.daemoim.groupManage.mapper.GroupMemberMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupMemberServiceImpl implements GroupMemberService {

	private final GroupMemberMapper mapper;
	
	// 모임 회원 조회
	@Override
	public Map<String, Object> getMemberList(Map<String, Object> paramMap) {
		
		// 전체멤버 수 조회(DEL_FL = 'N')
		int memberAllCount = mapper.getMemberCount((int)paramMap.get("groupNo"));
		
		// 페이지네이션 설정
		int cp = 1;
		if( paramMap.get("cp") != null) cp = Integer.parseInt(paramMap.get("cp").toString());
		ManagePagination pagination =  new ManagePagination(cp, memberAllCount, 20, 10);
		int limit = pagination.getLimit();
		int offset = (cp - 1) * limit;
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 전체멤버 상세조회
		List<GroupMemberManageDto> memberList = mapper.getMembers(paramMap, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("memberAllCount", memberAllCount);
		map.put("memberList", memberList);
		map.put("pagination", pagination);
		
		
		return map;
	}
	
}
