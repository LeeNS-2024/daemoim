package edu.kh.daemoim.search.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import org.springframework.ui.Model;
import edu.kh.daemoim.search.dto.SearchDTO;
import edu.kh.daemoim.search.service.SearchService;
import lombok.RequiredArgsConstructor;

@SessionAttributes({"loginMember"})
@Controller
@RequiredArgsConstructor
@RequestMapping("search")
public class SearchController {

	private final SearchService service;
	
    @GetMapping("search")
    public String searchPage(Model model) {
    	
    	// 추천 모임 목록 조회
        List<SearchDTO> recommendedGroups = service.getRecommendedGroups();

        model.addAttribute("recommendedGroups", recommendedGroups);

        
        return "search/search";
    }
}
