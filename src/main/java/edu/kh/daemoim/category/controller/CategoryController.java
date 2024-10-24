package edu.kh.daemoim.category.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.daemoim.category.dto.CategoryDTO;
import edu.kh.daemoim.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SessionAttributes({"loginMember"})
@Controller
@RequiredArgsConstructor
@RequestMapping("/category")  // 최상위 경로 설정
public class CategoryController {

    private final CategoryService service;

    /** 카테고리 페이지 이동 및 검색 기능 */
    @GetMapping("/category")
    public String getGroupsByCategory(
            @RequestParam(value = "type", required = false, defaultValue = "allCategory") String category,
            @RequestParam(value = "query", required = false, defaultValue = "") String query,
            @RequestHeader(value = "X-Requested-With", required = false) String requestedWith,
            Model model) {
        
        List<CategoryDTO> groupList = service.getGroupsByCategory(category, query);
        model.addAttribute("groupList", groupList);

        // 비동기 요청 여부 확인 (AJAX 요청이면 조각 파일 반환)
        if ("XMLHttpRequest".equals(requestedWith)) {
            return "category/groupList";  // 모임 목록 조각 반환
        }

        // 일반 요청이면 전체 페이지 반환
        return "category/category";  
    }
}
