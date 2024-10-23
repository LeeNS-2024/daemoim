package edu.kh.daemoim.groupManage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.daemoim.board.dto.Board;
import edu.kh.daemoim.board.dto.Comment;
import edu.kh.daemoim.groupManage.dto.GroupManageDto;
import edu.kh.daemoim.groupManage.dto.ManageCategory;

@Mapper
public interface GroupManageMapper {

	// 모임명 중복검사
	int groupNameCheck(String inputName);
	
	// 카테고리 리스트 검색
	List<ManageCategory> getCategoryList(int categoryNo);

	// 카테고리 검색
	List<ManageCategory> getCategoryArr();

	// 모임 생성
	int createGroup(GroupManageDto inputGroup);

	// 모임장 그룹에 넣기
	int insertGroupLeader(GroupManageDto inputGroup);
	
	// 모임 조회
	GroupManageDto selectGroup(int groupNo);

	// 모임 상세내용 수정
	int updateGroup(GroupManageDto updateGroup);

	// [인터페이스] 최근작성댓글 얻어오기
	List<Comment> getRecentComments(String groupNo);

	// 공지글 불러오기
	List<Board> getOrderBoard(int groupNo);

	// 최근글 불러오기
	List<Board> getRecentBoard(int groupNo);

	// 인기글 불러오기
	List<Board> getPopularBoard(@Param("groupNo") int groupNo, @Param("period") int period);



}
