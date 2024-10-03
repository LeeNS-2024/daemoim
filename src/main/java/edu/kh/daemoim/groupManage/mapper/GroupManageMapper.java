package edu.kh.daemoim.groupManage.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GroupManageMapper {

	int groupNameCheck(String inputName);

}
