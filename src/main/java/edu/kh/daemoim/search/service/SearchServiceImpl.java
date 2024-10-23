package edu.kh.daemoim.search.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.daemoim.search.dto.SearchDTO;
import edu.kh.daemoim.search.mapper.SearchMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService{

	private final SearchMapper mapper;
	
	@Override
    public List<SearchDTO> getRecommendedGroups() {
        return mapper.selectRecommendedGroups();
    }
	
}
