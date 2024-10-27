package edu.kh.daemoim.findIdPw.service;

import org.springframework.stereotype.Service;

import edu.kh.daemoim.findIdPw.mapper.FindIdPwMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FindIdPwServiceImpl implements FindIdPwService{

	private final FindIdPwMapper mapper;
	
	@Override
	public int findIdEmailcheck(String email) {
		
		return mapper.findIdEmailcheck(email);
	}
	@Override
	public int findPwEmailcheck(String id, String email) {
		
		return mapper.findPwEmailcheck(id,email);
	}
	
	@Override
	public String memberId(String email) {
		
		return mapper.memberId(email);
	}
}
