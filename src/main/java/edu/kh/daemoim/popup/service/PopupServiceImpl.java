package edu.kh.daemoim.popup.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.daemoim.popup.dto.Popup;
import edu.kh.daemoim.popup.mapper.PopupMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PopupServiceImpl implements PopupService {
	
	private final PopupMapper mapper;
	
	// 팝업 불러오기
	@Override
	public Popup getPopup() {
		List<Popup> popupList = mapper.getPopup();
		return popupList.get(0);
	}

}
