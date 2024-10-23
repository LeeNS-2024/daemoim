package edu.kh.daemoim.main.mapper;

import edu.kh.daemoim.main.dto.MainDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainMapper {
    List<MainDTO> selectRecommendedGroups();
}
