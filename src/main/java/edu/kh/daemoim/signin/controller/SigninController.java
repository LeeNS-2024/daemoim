package edu.kh.daemoim.signin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.daemoim.myPage.dto.MyPage;
import edu.kh.daemoim.signin.service.SigninService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
public class SigninController {

   private final SigninService service;
   
   @GetMapping("/signin")
   public String signup() {
      return "signin/signin";
   }
   
   @PostMapping("/login")
   public String login(@RequestParam("memberId") String memberId,
                  @RequestParam("memberPw") String memberPw,
                  RedirectAttributes ra,
                  Model model) {

      
      // myPage DTO 만들었는데 수정해야 할 수 있음 MemeberDTO로
      MyPage loginMember = service.login(memberId, memberPw);
      
      if(loginMember == null) {// 로그인 실패
         ra.addAttribute("message", "이메일와 비밀번호가 매치되지 않습니다.");
      }else {
         model.addAttribute("loginMember", loginMember);
         
      }
      
      return "redirect:/";
      }
   @GetMapping("logout")
	public String logout(SessionStatus status) {
		
		/* sessionStatus
		 *  -@SessionAttributes를 이용해 등록된 객체(값)의 상태흫
		 *  관리하는 객체
		 *  
		 *  -SessionStatus.setComplete();
		 *  -> 세션상태 완료 == 없앰(만료)
		 * 
		 */
		 status.setComplete();
		
		return "redirect:/";// 메인페이지
	}
}