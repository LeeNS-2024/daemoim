package edu.kh.daemoim.main.service;

import edu.kh.daemoim.main.dto.MainDTO;
import edu.kh.daemoim.main.mapper.MainMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

    private final MainMapper mainMapper;

    @Override
    public List<MainDTO> getRecommendedGroups() {
        return mainMapper.selectRecommendedGroups();
    }
}
