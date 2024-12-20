/* 비밀번호 변경 */

// 비밀번호 변경 form태그
const chagePwAuthKeyPageForm = document.querySelector("#chagePwAuthKeyPageForm");

// "변경하기" 버튼 클릭 시 또는 form 내부 엔터 입력 시
// == submit (제출)
chagePwAuthKeyPageForm?.addEventListener("submit", e => {

  // e.preventDefault(); // 기본 이벤트 막기
  // -> form의 기본 이벤트인 제출 막기
  // -> 유효성 검사 조건이 만족되지 않을 때 수행

  // 입력 요소 모두 얻어오기
  const newPw = document.querySelector("#newPw");
  const newPwConfirm = document.querySelector("#newPwConfirm");

  // 1. 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 
  //  입력 여부 체크
  let str; // undefined 상태

  if(newPwConfirm.value.trim().length == 0)
    str = "새 비밀번호 확인을 입력해 주세요";
  
  if(newPw.value.trim().length == 0)
    str = "새 비밀번호를 입력해 주세요";
  
  if(currentPw.value.trim().length == 0)
    str = "현재 비밀번호를 입력해 주세요";

  if(str !== undefined){ // 입력되지 않은 값이 존재
    alert(str);
    e.preventDefault(); // form 제출 막기
    return; // submit 이벤트 핸들러 종료
  }

  const lengthCheck = newPw.value.length >= 6 && newPw.value.length <= 20;
  const letterCheck = /[a-zA-Z]/.test(newPw.value); // 영어 알파벳 포함
  const numberCheck = /\d/.test(newPw.value); // 숫자 포함
  const specialCharCheck = /[\!\@\#\_\-]/.test(newPw.value); // 특수문자 포함

  // 조건이 하나라도 만족하지 못하면
  if ( !(lengthCheck && letterCheck && numberCheck && specialCharCheck) ) {
    alert("영어,숫자,특수문자 1글자 이상, 6~20자 사이로 입력해주세요")
    e.preventDefault();
    return;
  }


  // 3. 새 비밀번호, 새 비밀번호 확인이 같은지 체크
  if(newPw.value !== newPwConfirm.value){
    alert("새 비밀번호가 일치하지 않습니다");
    e.preventDefault();
    return;
  }

});

const urlParams = new URLSearchParams(window.location.search);
const findPwMemberId = urlParams.get('findPwMemberId');

// 숨겨진 필드에 쿼리 파라미터 값 설정
if (findPwMemberId) {
  document.getElementById('findPwMemberId').value = findPwMemberId;
}