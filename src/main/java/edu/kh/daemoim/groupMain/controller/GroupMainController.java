package edu.kh.daemoim.groupMain.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.daemoim.groupMain.dto.Notice;
import edu.kh.daemoim.groupMain.dto.PhotoBox;
import edu.kh.daemoim.groupMain.dto.Schedule;
import edu.kh.daemoim.groupMain.service.GroupMainService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class GroupMainController {

    private final GroupMainService service;

    /** 페이지 전환
     * @param model
     * @return
     */

    @GetMapping("groupMain/{groupNo}")
    public String groupMain(Model model,
    					@PathVariable("groupNo") int groupNo) {
        // 공지사항 목록을 미리 불러와서 model에 추가
        List<Notice> boardList = service.getBoardList();
        List<PhotoBox> photos = service.getPhotos(groupNo);
        List<Schedule> schedules = service.getSchedule(groupNo);
        String introduces = service.getIntroduce(groupNo);
      
      
        
        model.addAttribute("boardList", boardList);  // 모델에 추가하여 템플릿에서 사용
        model.addAttribute("photos", photos);
        model.addAttribute("schedules", schedules);
        model.addAttribute("introduces", introduces.split("\n"));
     
        
        return "groupMain/main";  // 뷰 이름 반환
    }

    /** 공지사항 목록 불러오기
     * @return
     */
    @GetMapping("/board/boardList")
    @ResponseBody  // JSON으로 응답
    public List<Notice> selectBoardList() {
        return service.selectBoardList();
    }
    

}
