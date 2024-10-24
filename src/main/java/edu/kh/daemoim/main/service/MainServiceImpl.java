package edu.kh.daemoim.main.service;

import edu.kh.daemoim.main.dto.MainDTO;
import edu.kh.daemoim.main.mapper.MainMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

    private final MainMapper mapper;

    // 추천 모임 목록 조회
    @Override
    public List<MainDTO> getRecommendedGroups() {
        return mapper.selectRecommendedGroups();
    }
    
    
    // 로그인한 회원의 가입한 모임 조회
    @Override
    public List<MainDTO> selectJoinGroups(int memberNo) {
        return mapper.selectJoinGroups(memberNo);
    }
}
