package edu.kh.daemoim.signup.mapper;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.daemoim.myPage.dto.MyPage;

@Mapper
public interface SignupMapper {

	
	// 이메일 체크
	int memberEmailCheck(String email);
	
	// 아이디 체크
	int memberIdCheck(String memberId);
	
	// 닉네임 체크
	int nicknameCheck(String nickname);

	// 회원가입 마지막
	int signUp(MyPage inputMember);

	


}
