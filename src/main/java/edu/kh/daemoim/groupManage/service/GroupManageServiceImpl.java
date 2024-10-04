package edu.kh.daemoim.groupManage.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.daemoim.groupManage.mapper.GroupManageMapper;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class GroupManageServiceImpl implements GroupManageService {
	
	private final GroupManageMapper mapper;

	// 모임이름 중복검사
	@Override
	public int groupNameCheck(String inputName) {
		return mapper.groupNameCheck(inputName);
	}

}
