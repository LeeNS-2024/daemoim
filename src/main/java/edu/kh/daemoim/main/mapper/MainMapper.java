package edu.kh.daemoim.main.mapper;

import edu.kh.daemoim.main.dto.MainDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainMapper {

    // 추천 모임 목록 조회
    List<MainDTO> selectRecommendedGroups();

    // 로그인한 회원의 가입한 모임 조회
    List<MainDTO> selectJoinGroups(int memberNo);


	MainDTO findGroupByNo(int groupNo);

	List<MainDTO> selectRecentChatGroups();
}
