package edu.kh.daemoim.groupManage.service;

public interface GroupManageService {

	/** 모임이름 중복검사
	 * @param inputName
	 * @return
	 */
	int groupNameCheck(String inputName);

}
