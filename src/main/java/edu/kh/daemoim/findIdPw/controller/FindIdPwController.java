package edu.kh.daemoim.findIdPw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.daemoim.findIdPw.service.FindIdPwService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@Controller
@RequiredArgsConstructor
public class FindIdPwController {

	private final FindIdPwService service;
	
	@GetMapping("/findIdPage")
	public String findIdPw() {
		
		return "findIdPw/findIdPage";
	}
	@GetMapping("/findPwPage")
	public String findPw() {
		
		return "findIdPw/findPwPage";
	}
	
	@ResponseBody
	@GetMapping("/findIdEmail")
	public int findIdEmailcheck(@RequestParam("email") String email){
		return service.findIdEmailcheck(email);
	}
	
	
	@ResponseBody
	@GetMapping("/findPwEmail")
	public int findIdEmailcheck(@RequestParam("id") String id,
						@RequestParam("email") String email){
		return service.findPwEmailcheck(id,email);
	}
	
	@PostMapping("memberId")
	public String memberId(@RequestBody String email) {
		
		return service.memberId(email);
	}
	
}
