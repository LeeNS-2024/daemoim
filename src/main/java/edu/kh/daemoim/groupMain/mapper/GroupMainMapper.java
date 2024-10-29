package edu.kh.daemoim.groupMain.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.daemoim.groupMain.dto.Notice;
import edu.kh.daemoim.groupMain.dto.PhotoBox;
import edu.kh.daemoim.groupMain.dto.Schedule;
import io.lettuce.core.dynamic.annotation.Param;

@Mapper
public interface GroupMainMapper {

	/**
	 *  공지 목록 조회
	 * @return
	 */
	List<Notice> getBoardList();

	/**
	 *  공지사항 목록 불러오기
	 * @return
	 */

	List<Notice> selectBoardList();

	/**
	 *  사진 불러오기
	 * @param groupNo
	 * @return
	 */

	List<PhotoBox> getPhotos(int groupNo);

	/**
	 *  일정 불러오기
	 * @param groupNo
	 * @return
	 */
	List<Schedule> getSchedule(int groupNo);

	/**
	 * 소개 불러오기 
	 * @param groupNo
	 * @return
	 */
	String getIntroduce(int groupNo);

	/**모임 회원 체크
	 * @param groupNo
	 * @param memberNo
	 * @return
	 */
	int checkLoginMember(@Param("groupNo") int groupNo, @Param("memberNo") int memberNo);



	
}
