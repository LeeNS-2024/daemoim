package edu.kh.daemoim.signup.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.daemoim.common.util.RedisUtil;
import edu.kh.daemoim.signup.service.SignupService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SignupController {
	
	private final SignupService service;

	
	@GetMapping("/signup")
	public String signupPage() {
		return "signup/signup";
	}
	
	@PostMapping("signup")
	public String signupMember() {
		
		return null;
	}
	
	@ResponseBody // 반환 값을 응답 본문 (ajax 코드)로 반환
	@GetMapping("emailCheck")
	public int emailCheck(
			@RequestParam("email") String email
			) {
		return service.memberEmailCheck(email);
	}
	
	//아이디
	@ResponseBody
	@GetMapping("idCheck")
	public int idCheck(@RequestParam("memberId") String memberId) {
		return service.memberIdCheck(memberId);
	}
	
	//닉네임 
	@ResponseBody
	@GetMapping("nicknameCheck")
	public int nicknameCheck(@RequestParam("nickname") String nickname) {
		return service.nicknameCheck(nickname);
	}
	
	// 전화번호 
	@ResponseBody
	@GetMapping("telCheck")
	public int telCheck(@RequestParam("tel") String tel) {
		
		return service.telCheck(tel);
	}
	
	
	
	//---------------------------------------------------------
	// 인증번호 관련 코드
	
	private final RedisUtil redisUtil;
	
	
	// 레디스 확인하기
	@ResponseBody
	@GetMapping("redisTest")
	public int redisTest(
			@RequestParam("key") String key,
			@RequestParam("value") String value
			) {
		
		// 전달 받은 key, value를 reids에 set 하기 
		redisUtil.setValue(key,value,60);
		
		return 1;
	}
	
	/** 인증 번호 발송
	 * @param email : 입력된 이메일
	 * @return 성공 1, 실패 0
	 */
	@ResponseBody
	@PostMapping("sendAuthKey")
	public int sendAuthKey(@RequestBody String email) {
		
		return service.sendEmail("signUp",email);
	}
	
	
	
	
	
}
