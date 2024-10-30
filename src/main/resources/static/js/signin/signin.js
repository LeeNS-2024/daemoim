function getCookie(key){
  const cookies = document.cookie; // "K=V;K=V;..." 
  // ; 로 구분
  const arr = cookies.split(";"); // ["K=V", "K=V"]
  const cookieObj = {}; // 빈 객체 생성
  for(let entry of arr){
    const temp = entry.split("="); 
    cookieObj[temp[0]] = temp[1];
  }
  return cookieObj[key];
}
// HTML 로딩(랜더링)이 끝난 후 수행
document.addEventListener("DOMContentLoaded", () => {

  const saveId = getCookie("saveId"); // 쿠키에 저장된 Email 얻어오기

  if(saveId == undefined) return; 

  const memberId
    = document.querySelector("#loginForm input[name=memberId]");

  const checkbox 
    = document.querySelector("#loginForm input[name=saveId]");

  // 로그인 상태인 경우 함수 종료
  if(memberId == null) return;

  // 이메일 입력란에 저장된 이메일 출력
  memberId.value = saveId;

  // 이메일 저장 체크박스를 체크 상태로 바꾸기
  checkbox.checked = true;
});