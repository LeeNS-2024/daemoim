package edu.kh.daemoim.popup.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.daemoim.popup.dto.Popup;
import edu.kh.daemoim.popup.service.PopupService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RequestParam;


@Slf4j
@RequestMapping("popup")
@SessionAttributes({"popupCheck"})
@Controller
@RequiredArgsConstructor
public class PopupController {
	
	private final PopupService service;
	
	// 개발용 미리보기창 호출
//	@GetMapping("popup")
//	public String goPopup(){
//		return "common/popupViews";
//	}
	
	// 팝업 불러오기
	@ResponseBody
	@GetMapping("popupCheck")
	public Map<String, Object> popupCheck(
			@SessionAttribute(required = false, value = "popupCheck") String popupCheck,
			HttpServletRequest req,
			HttpServletResponse resp){
		
		// 결과 저장용 Map
		Map<String, Object> map = new HashMap<>();
		
		
		
		/* 쿠키 체크 */
		Cookie[] cookies = null;
		Cookie cookie = null;
		
		if(req.getCookies() != null){	// 첫 실행이라면 쿠키가 없을 수 있음
	    	cookies = req.getCookies();
	        
	        // 호출한 쿠키들 중 이름이 "popupCookie"인 쿠키를 꺼냄
	        for(Cookie temp : cookies){
	        	if(temp.getName().equals("popupCookie") ){
	            	cookie = temp;
	                break;
	            }
	        } // for end
	    } // if end
		
		
		int result = 0;
		
		// 전달받은 쿠키 중 하루동안 안열기가 있었다면 return;
		if(cookie != null){
			
			log.debug("[기능] 쿠키로 인해 팝업창 열기 종료됨");
			map.put("result", result);
			return map;
			
		} // if end
		
		
		
		/* 세션 체크, 이번 세션에 연적 있으면 안띄움 */
		if(popupCheck != null) {
			log.debug("[기능] 세션으로 인해 팝업창 열기 종료됨");
			log.info("[기능] popupCheck : {}", popupCheck);
			map.put("result", result);
			return map;
		}
		
		
		
		// 여기까지오면 팝업창 열기
		result = 1;
		
		Popup popup = service.getPopup();
		
		map.put("popup", popup);
		map.put("result", result);
		
		return map;
	}
	
	/** 팝업 닫기
	 * @param param
	 * @throws ParseException 
	 */
	@ResponseBody
	@GetMapping("popupClose")
	public void popupClose(
			@RequestParam("check") int check,
			Model model,
			HttpServletRequest req,
			HttpServletResponse resp ) throws ParseException {
		
		/* 세션이 유지되는동안 팝업 안띄움 */
		model.addAttribute("popupCheck", "on");
		
		/* 오늘하루 안보기 클릭시 */
		if(check == 0) return;
		
		/* 쿠키 체크구문 작성 */
		Cookie[] cookies = null;
		Cookie cookie = null;
		
		if(req.getCookies() != null){
	    	cookies = req.getCookies();
	        
	        for(Cookie temp : cookies){
	        	if(temp.getName().equals("popupCookie") ){
	            	cookie = temp;
	                break;
	            }
	        } // for end
	    } // if end
		
		
		// 쿠키가 이미 있다면 return;
		// 아마 실행될 일 없음
		if(cookie != null) return;
			
		cookie = new Cookie("popupCookie", "[/on]");
		
		// 요청주소
		cookie.setPath("/popup");
        
		// 수명설정
		Calendar calendar = Calendar.getInstance();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		Date date = new Date(); // 현제시간

		calendar.add(calendar.DATE, 1);
		Date temp = new Date(calendar.getTimeInMillis());

		Date midnight = sdf.parse( sdf.format(temp) );
		
		long diff = (midnight.getTime() - date.getTime() ) / 1000;

		cookie.setMaxAge((int)diff);
        
        // HttpServletResponse 객체에 쿠키 저장
        resp.addCookie(cookie);
			
	}
	
	@GetMapping("manage")
	public String goManagePage() {
		return "/siteManage/popupManage";
	}
	
	
}
