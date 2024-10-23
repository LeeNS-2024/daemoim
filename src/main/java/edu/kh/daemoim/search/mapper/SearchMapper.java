package edu.kh.daemoim.search.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.daemoim.search.dto.SearchDTO;

@Mapper
public interface SearchMapper {

	List<SearchDTO> selectRecommendedGroups();
	
}
