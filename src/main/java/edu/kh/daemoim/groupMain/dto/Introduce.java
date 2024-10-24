package edu.kh.daemoim.groupMain.dto;

import java.util.List;

import edu.kh.daemoim.board.dto.Board;
import edu.kh.daemoim.board.dto.BoardImg;
import edu.kh.daemoim.board.dto.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder

public class Introduce {

	private int groupNo;
	private String groupName;
	private int groupDate;
	private String groupDelFl;
	private String groupIntroduce;
	
}
