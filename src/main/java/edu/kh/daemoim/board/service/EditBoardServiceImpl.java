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
	
	
	// 게시글 작성
	@Override
	public int boardInsert(Board inputBoard, List<MultipartFile> images) {
		
		// 게시글 부분 DB에 추가
		int result = mapper.boardInsert(inputBoard);
		System.out.println(inputBoard.getBoardNo());
		
		// 삽입 실패 시
		if(result == 0) return 0;
		
		/* 삽입된 게시글 번호 */
		int boardNo = inputBoard.getBoardNo();
		
		// 실제 업로드한 파일 정보만 모아두는 List
		List<BoardImg> uploadList = new ArrayList<>();
		
		// images 리스트에서 실제 업로드된 파일만 골라내기
		for(int i=0 ; i < images.size(); i++) {
			
			// 제출된 파일이 없을 경우
			if(images.get(i).isEmpty()) continue;
			
			// 있을 경우!
			
			// 파일 원본명
			String boardImgOriginalName = images.get(i).getOriginalFilename();
			
			// 변경된 파일명
			String boardImgRename = FileUtil.rename(boardImgOriginalName);
			
			// DB INSERT를 위한 BoardImg 객체 생성
			BoardImg img 
				= BoardImg.builder()
					.boardImgOriginalName(boardImgOriginalName) 	// 원본명
					.boardImgRename(boardImgRename) 											// 변경명
					.boardImgPath(webPath)  											// 웹 접근 경로
					.boardNo(boardNo)  														// 이미지가 삽입된 게시글 번호
					.boardImgOrder(i)															// 최대 20개의 이미지 칸 중에서 제출된 칸의 순서
					.uploadFile(images.get(i)) 										// 실제 업로드된 이미지 데이터
					.build();
			
			
			// uploadList에 추가
			uploadList.add(img);
			
		} // for end
		
		// 제출된 이미지가 없다면
		if(uploadList.isEmpty()) return boardNo;
		
		
		// 여러 행 한 번에 삽입 후 삽입된 행의 개수 반환
		int insertRows = mapper.insertUploadList(uploadList);
		
		
		// INSERT된 행의 개수와 uploadList의 개수가 같지 않은 경우
		if(insertRows != uploadList.size()) {
			throw new RuntimeException("이미지 INSERT 실패");
			
		} // 앞서 삽입한 게시글 부분도 ROLLBACK 되도록 예외 강제 발생
		try {
			File folder = new File(folderPath);
			if(folder.exists() == false) { // 폴더가 없을 경우
				folder.mkdirs(); // 폴더 생성
			}
			
			// 모두 삽입 성공 시
			// 임시 저장된 파일을 서버에 지정된 폴더 + 변경명으로 저장
			for(BoardImg img : uploadList) {
				img.getUploadFile()
					.transferTo(new File(folderPath + img.getBoardImgRename()));
			}
		} catch(Exception e) {
			e.printStackTrace();
			throw new FileUploadFailException(); // 사용자 정의 예외 던짐
		}
		return boardNo;
	}

	
	
}
