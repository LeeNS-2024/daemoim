package edu.kh.daemoim.signup.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.SpringTemplateEngine;

import edu.kh.daemoim.common.util.RedisUtil;
import edu.kh.daemoim.signup.mapper.SignupMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignupServiceImpl implements SignupService {

	private final SignupMapper mapper;

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
