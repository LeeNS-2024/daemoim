package edu.kh.daemoim.sse.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.daemoim.sse.dto.Notification;
import edu.kh.daemoim.sse.mapper.SseMapper;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class SseServiceImpl implements SseService{

	private final SseMapper mapper;
	
	@Override
	public Map<String, Object> insertNotification(Notification notification) {
		
		Map<String, Object> map = null;
		
		int result = mapper.insertNotification(notification);
		
		if(result > 0) {
			map = mapper.selectReceiveMember(notification.getNotificationNo());
		}
		
		return map;
	}
}
