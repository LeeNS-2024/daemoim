package edu.kh.daemoim.board.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.daemoim.board.dto.Board;
import edu.kh.daemoim.board.dto.BoardImg;
import edu.kh.daemoim.board.mapper.EditBoardMapper;
import edu.kh.daemoim.common.exception.FileUploadFailException;
import edu.kh.daemoim.common.util.FileUtil;
import lombok.RequiredArgsConstructor;

@PropertySource("classpath:/config.properties")
@Service
@Transactional
@RequiredArgsConstructor
public class EditBoardServiceImpl implements EditBoardService{

	private final EditBoardMapper mapper;
	
	@Value("${daemoim.board.web-path}")
	private String webPath;
	
	@Value("${daemoim.board.folder-path}")
	private String folderPath;

	@Override
	public int boardInsert(Board inputBoard, List<MultipartFile> images) {
		return 0;
	} // 삭제할 구문
	
	
	
	
	// 게시글 작성
	/*
	 * @Override public int boardInsert(Board inputBoard, List<MultipartFile>
	 * images) {
	 * 
	 * int result = mapper.boardInsert(inputBoard);
	 * 
	 * // 등록 실패 시 if(result == 0) return 0;
	 * 
	 * int boardNo = inputBoard.getBoardNo();
	 * 
	 * // 실제 업로드된 파일정보 모아둔 List List<BoardImg> uploadList = new ArrayList<>();
	 * 
	 * for(int i=0; i < images.size(); i++) {
	 * 
	 * // 제출된 파일이 없으면 if(images.get(i).isEmpty()) continue;
	 * 
	 * // 제출된 파일이 있으면
	 * 
	 * String boardImgOriginalName = images.get(i).getOriginalFilename(); String
	 * rename = FileUtil.rename(boardImgOriginalName);
	 * 
	 * // DB INSERT를 위한 BoardImg 객체 생성 BoardImg img = BoardImg.builder()
	 * .boardImgOriginalName(boardImgOriginalName) // 원본명 .boardImgRename(rename) //
	 * 변경명 .boardImgPath(webPath) // 웹 접근 경로 .boardNo(boardNo) // 이미지가 삽입된 게시글 번호
	 * .boardImgOrder(i) // 5개의 이미지 칸 중에서 제출된 칸의 순서 .uploadFile(images.get(i)) // 실제
	 * 업로드된 이미지 데이터 .build();
	 * 
	 * uploadList.add(img); }
	 * 
	 * // 제출된 이미지가 없으면 if(uploadList.isEmpty()) return boardNo;
	 * 
	 * // 여러 행 한 번에 삽입 후 삽입된 행의 개수 반환 int insertRows =
	 * mapper.insertUploadList(uploadList);
	 * 
	 * if(insertRows != uploadList.size()) { throw new
	 * RuntimeException("이미지 등록 실패"); } try{ File folder = new File(folderPath);
	 * if(folder.exists() == false) { // 폴더가 없을경우 folder.mkdirs(); // 폴더만들기 }
	 * 
	 * for(BoardImg img : uploadList) { img.getUploadFile().transferTo(new
	 * File(folderPath + img.getBoardImgRename())); } } catch(Exception e) {
	 * e.printStackTrace(); throw new FileUploadFailException(); }
	 * 
	 * return boardNo; }
	 */
}
