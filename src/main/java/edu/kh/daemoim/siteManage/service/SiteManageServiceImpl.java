package edu.kh.daemoim.siteManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.daemoim.groupManage.dto.GroupManageDto;
import edu.kh.daemoim.groupManage.dto.GroupMemberManageDto;
import edu.kh.daemoim.siteManage.mapper.SiteManageMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SiteManageServiceImpl implements SiteManageService {

	private final SiteManageMapper mapper;

	
	// 사이트매니저 필요정보 얻어오기
	@Override
	public Map<String, Object> getSiteManage() {
		
		// 총 모임 수
		int groupAllcount = mapper.getGroupAllcount();
		
		// 총 회원수
		int memberAllcount = mapper.getMemberAllcount();
		
		// 정지된 계정 수
		int outMemberCount = mapper.getOutMemberCount();
		
		// 오늘 새로 가입한 회원 수
		int todayEnrollCount = mapper.getTodayEnrollCount();
		
		// 모임조회 - 전체활동이 많았던 모임 5개
		List<GroupManageDto> groupList = mapper.getActiveGroupList();
		
		// 회원조회 - 최근 가입한 회원 5개
		List<GroupMemberManageDto> memberList = mapper.getNewMember();
		
		Map<String, Integer> countList = new HashMap<>();
		Map<String, Object> map = new HashMap<>();
		countList.put("groupAllcount", groupAllcount);
		countList.put("memberAllcount", memberAllcount);
		countList.put("outMemberCount", outMemberCount);
		countList.put("todayEnrollCount", todayEnrollCount);
		map.put("countList", countList);
		map.put("groupList", groupList);
		map.put("memberList", memberList);

		return map;
	}
	
}
