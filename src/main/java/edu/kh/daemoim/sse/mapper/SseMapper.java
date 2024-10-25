package edu.kh.daemoim.sse.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.daemoim.sse.dto.Notification;

@Mapper
public interface SseMapper {

	int insertNotification(Notification notification);

	Map<String, Object> selectReceiveMember(int notificationNo);


}
