package edu.kh.daemoim.main.controller;

import edu.kh.daemoim.main.dto.MainDTO;
import edu.kh.daemoim.main.service.MainService;
import edu.kh.daemoim.myPage.dto.MyPage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@SessionAttributes("loginMember")
public class MainController {

    private final MainService service;

    @RequestMapping("/")
    public String mainPage(HttpSession session, Model model) {
        MyPage loginMember = (MyPage) session.getAttribute("loginMember");

        List<MainDTO> recommendedGroups = service.getRecommendedGroups();
        model.addAttribute("recommendedGroups", recommendedGroups);

        if (loginMember != null) {
            int memberNo = loginMember.getMemberNo();
            List<MainDTO> joinGroups = service.selectJoinGroups(memberNo);
            model.addAttribute("joinGroups", joinGroups);
        }
        log.info("로그인한 사용자 정보: {}", loginMember);
        return "common/main";
    }
    
    @RequestMapping("/groupMain/{groupNo}")
    public String groupMainPage(@PathVariable int groupNo, Model model) {
        MainDTO group = service.findGroupByNo(groupNo);
        model.addAttribute("group", group);
        return "groupMain"; 
    }
}

