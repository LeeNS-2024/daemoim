package edu.kh.daemoim.myPage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.daemoim.myPage.service.MyPageService;
import jakarta.mail.Session;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("myPage")
@SessionAttributes({"loginMember"})
public class MyPageController {

	private final MyPageService service;
	
	@GetMapping("info")
	public String info() {
		
	
		
		return "myPage/myPage-info";
	}
	
	@GetMapping("changePw")
	public String changePw() {
		return "myPage/myPage-changePw";
	}
	
	@GetMapping("withdrawal")
	public String withdrawal() {
		return "myPage/myPage-withdrawal";
	}

	@GetMapping("withdrawalPage")
	public String withdrawalPage() {
		return "myPage/withdrawalPage";
	}
	
	
}
