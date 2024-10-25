package edu.kh.daemoim.siteManage.service;

import java.util.Map;

import edu.kh.daemoim.siteManage.dto.StopMember;

public interface SiteManageService {

	// 사이트메니저 필요정보 받아오기
	Map<String, Object> getSiteManage();

	/** 계정 정지(이메일 일치 확인)
	 * @param email
	 * @return
	 */
	StopMember findMemberByEmail(String email);

	/** 계정 정지 처리
	 * @param member
	 * @param dayss
	 * @param reason
	 */
	int StopMember(StopMember member);

	/** 회원 탈퇴
	 * @param member
	 * @return
	 */
	int resignMember(StopMember member);
	

}
