package edu.kh.daemoim.groupMain.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.daemoim.groupMain.dto.PhotoBox;
import edu.kh.daemoim.groupMain.service.PhotoBoxService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/photo")
public class PhotoBoxController {

	private final PhotoBoxService service;
	
	
	@GetMapping("/photobox")
	public Map<String, Object> getPhotoBoxData() {
		
	Map<String, Object> photoList = new HashMap<>();
	
	
	
	    
		return service.getPhotoBoxData();
	
	}
	
}
