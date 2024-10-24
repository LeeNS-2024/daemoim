package edu.kh.daemoim.search.service;

import java.util.List;

import edu.kh.daemoim.search.dto.SearchDTO;

public interface SearchService {

	List<SearchDTO> getRecommendedGroups();

}
