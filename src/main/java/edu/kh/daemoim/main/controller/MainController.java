package edu.kh.daemoim.main.controller;

import edu.kh.daemoim.main.dto.MainDTO;
import edu.kh.daemoim.main.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MainController {

    private final MainService service;

    @RequestMapping("/")
    public String mainPage(Model model) {
        
    	// 추천 모임 목록 조회
        List<MainDTO> recommendedGroups = service.getRecommendedGroups();

        model.addAttribute("recommendedGroups", recommendedGroups);

        return "common/main"; 	
    }
}
