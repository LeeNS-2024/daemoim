package edu.kh.daemoim.chatting.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.daemoim.chatting.dto.Chat;
import edu.kh.daemoim.chatting.dto.ChatRoom;
import edu.kh.daemoim.chatting.mapper.ChattingMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ChattingServiceImpl implements ChattingService {
	
	private final ChattingMapper mapper;

	// 받은 채팅메세지 처리
	@Override
	public int insertChatting(Chat chat) {
		
		// 이전까지 있던 메시지들 읽음처리
		mapper.updateChatCount(chat.getMemberNo(), chat.getGroupNo());
		
		// 마지막 접속시간 업데이트
		int result = mapper.updateChatContectDate(chat.getMemberNo(), chat.getGroupNo());
		// 없으면 만들어야함
		if( result < 1) mapper.insertChatContectDate(chat.getMemberNo(), chat.getGroupNo());
		
		// 삽입 후 결과반환
		return mapper.insertChatting(chat);
	}

	// [ws] 채팅받을 모임의 회원들 얻어오기
	@Override
	public List<Chat> getMemberNos(int groupNo) {
		return mapper.getMemberNos(groupNo);
	}

	// 채팅내용 불러오기
	@Override
	public List<Chat> getContent(int groupNo) {
		return mapper.getContent(groupNo);
	}

	// 채팅룸 정보 가져가기
	// 모임 List - 회원 수 내림차순, resultMap이용
	//  모임번호
	//  모임이름
	//  메시지 카운트
	//마지막 읽은 모임번호 lastReaded
	@Override
	public Map<String, Object> getChatInfo(int memberNo) {
		List<ChatRoom> groupList = mapper.getChatInfo(memberNo);
		int result = mapper.searchChatRoom(memberNo);
		int lastReaded = 0;
		if(result>0) {
			lastReaded = mapper.getLastReaded(memberNo);
		} else {
			lastReaded = -1;
		}
		
		
		Map<String, Object> map = new HashMap<>();
		map.put("groupList", groupList);
		map.put("lastReaded", lastReaded);
		
		return map;
	}

	@Override
	public void updateReadDate(int groupNo, int memberNo) {
		// 마지막 접속시간 업데이트
		int result = mapper.updateChatContectDate(memberNo, groupNo);
		// 없으면 만들어야함
		if( result < 1) mapper.insertChatContectDate(memberNo, groupNo);
	}

}
