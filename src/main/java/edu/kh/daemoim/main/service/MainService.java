package edu.kh.daemoim.main.service;

import java.util.List;

import edu.kh.daemoim.main.dto.MainDTO;

public interface MainService {

	// 추천 모임 목록 조회
	List<MainDTO> getRecommendedGroups();

	// 로그인한 회원의 가입한 모임 조회
	List<MainDTO> selectJoinGroups(int memberNo);


	MainDTO findGroupByNo(int groupNo);

}
