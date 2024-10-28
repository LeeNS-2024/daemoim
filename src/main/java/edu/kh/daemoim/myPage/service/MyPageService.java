package edu.kh.daemoim.myPage.service;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.daemoim.myPage.dto.MyPage;

public interface MyPageService {


	// 회원 정보 수정
	int updateInfo(MyPage inputMember);

	//탈퇴
	int withdrawal(String memberPw, MyPage loginMember);

	// 닉네임 변경
	int checkNickname(String input);

	// 비밀번호 변경
	int changePw(String currentPw, String newPw, MyPage loginMember);

	// 프로필 수정
	String profile(MultipartFile profileImg, int memberNo) ;
	
	

	
}
