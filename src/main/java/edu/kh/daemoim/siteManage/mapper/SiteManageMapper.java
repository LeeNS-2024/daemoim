package edu.kh.daemoim.siteManage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.daemoim.groupManage.dto.GroupManageDto;
import edu.kh.daemoim.groupManage.dto.GroupMemberManageDto;

@Mapper
public interface SiteManageMapper {
	
	// 그룸 총 모입수 조회
	int getGroupAllcount();

	// 멤버 총 인원수 조회
	int getMemberAllcount();

	// 정지 계정 수 조회
	int getOutMemberCount();

	// 오늘 가입한 회원 수 조회
	int getTodayEnrollCount();

	// 활동이 많은 그룹 조회
	List<GroupManageDto> getActiveGroupList();

	// 최근 가입한 회원 조회
	List<GroupMemberManageDto> getNewMember();

}
