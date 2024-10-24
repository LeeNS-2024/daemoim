package edu.kh.daemoim.signup.service;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.SpringTemplateEngine;


import edu.kh.daemoim.myPage.dto.MyPage;
import edu.kh.daemoim.common.util.RedisUtil;
import edu.kh.daemoim.signup.mapper.SignupMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignupServiceImpl implements SignupService {

	private final SignupMapper mapper;

	private final BCryptPasswordEncoder encoder;
	// 이메일 체크
	@Override
	public int memberEmailCheck(String email) {
		return mapper.memberEmailCheck(email);
		// 체크후 중복일 경우 제출 막기
	}

	// 아이디 체크
	@Override
	public int memberIdCheck(String memberId) {
		return mapper.memberIdCheck(memberId);
	}

	// 닉네임 체크
	@Override
	public int nicknameCheck(String nickname) {
		return mapper.nicknameCheck(nickname);
	}

	// 마지막 가입 신청
	@Override
	public int signUp(MyPage inputMember) {
		//  비밀번호 암호화
		String encPw = encoder.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
	// 주소 미입력시 오류 방지용
		if(inputMember.getMemberAddress().equals(",,")) {
			inputMember.setMemberAddress(null);
		}
	return mapper.signUp(inputMember);
}

	
	// 전화번호 체크
	@Override
	public int telCheck(String tel) {
		return mapper.telCheck(tel);
	}

	// -----------------------------------------------------

	private final JavaMailSender mailSender;

	private final RedisUtil redisUtil;

	private final SpringTemplateEngine templateEngine;

	@Override
	public int sendEmail(String htmlName, String email) {
		
		return 0;
	}

}
