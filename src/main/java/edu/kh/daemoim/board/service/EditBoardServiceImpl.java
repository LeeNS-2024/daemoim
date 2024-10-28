package edu.kh.daemoim.board.service;

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
import edu.kh.daemoim.common.util.FileUtil;
import lombok.RequiredArgsConstructor;

@PropertySource("classpath:/config.properties")
@Service
@Transactional
@RequiredArgsConstructor
public class EditBoardServiceImpl implements EditBoardService{

	private final EditBoardMapper mapper;
	
	@Value("${my.board.web-path}")
	private String webPath;
	
	@Value("${my.board.folder-path}")
	private String folderPath;
	
	
	
	
	// 게시글 작성
	@Override
	public int boardInsert(Board inputBoard, List<MultipartFile> images) {
		
		int result = mapper.boardInsert(inputBoard);
		
		// 등록 실패 시
		if(result == 0) return 0;
		
		int boardNo = inputBoard.getBoardNo();
		
		// 실제 업로드된 파일정보 모아둔 List
		List<BoardImg> uploadList = new ArrayList<>();
		
		for(int i=0; i < images.size(); i++) {
			
			// 제출된 파일이 없으면
			if(images.get(i).isEmpty()) continue;
			
			// 제출된 파일이 있으면
			
			String originalName = images.get(i).getOriginalFilename();
			String rename = FileUtil.rename(originalName);
			
			BoardImg img = BoardImg.builder()
										.imgOriginalName(originalName)
										.imgRename(rename)
										.imgPath(webPath)
										.boardNo(boardNo)
										.imgOrder(i)
										.uploadFile(images.get(i))
										.build();
			
			uploadList.add(img);
		}
		
		if(uploadList.isEmpty()) return boardNo;
		
		// 여러 행 한 번에 삽입 후 삽입된 행의 개수 반환
		int insertRows = mapper.insertUploadList(uploadList);
		
		return 0;
	}
}
