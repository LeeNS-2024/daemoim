package edu.kh.daemoim.main.controller;

import edu.kh.daemoim.main.dto.MainDTO;
import edu.kh.daemoim.main.service.MainService;
import edu.kh.daemoim.myPage.dto.MyPage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
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

        return "common/main";
    }
}
