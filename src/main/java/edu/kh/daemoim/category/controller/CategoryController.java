package edu.kh.daemoim.category.controller;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("category") 
public class CategoryController {

    private final CategoryService service;

    
    /** 입력된 검색어 조회하기
     * @param category
     * @param query
     * @param model
     * @return
     */
    @GetMapping("/category")
    public String categoryPage(@RequestParam(value = "type", required = false, defaultValue = "allCategory") String category,
                               @RequestParam(value = "query", required = false, defaultValue = "") String query,
                               Model model) {
        List<CategoryDTO> groupList = service.getGroupsByCategory(category, query);
        model.addAttribute("groupList", groupList);
        return "category/category";  
    }


    
}
