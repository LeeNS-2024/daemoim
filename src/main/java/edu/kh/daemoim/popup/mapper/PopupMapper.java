package edu.kh.daemoim.popup.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.daemoim.popup.dto.Popup;

@Mapper
public interface PopupMapper {

	// 팝업 불러오기
	List<Popup> getPopup();

}
