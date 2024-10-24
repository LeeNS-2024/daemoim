package edu.kh.daemoim.signup.service;

import edu.kh.daemoim.myPage.dto.MyPage;

public interface SignupService {

	
	
	
	
	
	// 닉네임 
	int nicknameCheck(String nickname);

	// 아이디 체크
	int memberIdCheck(String memberId);

	// 이메일 체크
	int emailCheck(String email);

	//회원가입 마지막
	int signUp(MyPage inputMember);

}
