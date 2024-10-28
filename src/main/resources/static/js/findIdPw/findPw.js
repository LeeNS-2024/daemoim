/* 필수 입력 항목의 유효성 검사여부를 체크하기 위한 객체(체크리스트)*/
const checkObj = {
  "findPwMemberEmail": false,
  "memberDomain": false,
  "memberFullEmail": false,
  "memberId": false,
  "memberPw": false,
  "memberPwConfirm": false,
  "memberNickname": false,
  "memberTel": false,
  "authKey": false
};

const idMessage = document.querySelector("#FindPw-message");
const findPwMemberEmail = document.querySelector("#findPwMemberEmail");
const emailMessage = document.getElementById("findIdemailMessage");
const findPwMemberId = document.querySelector("#findPwMemberId")

const idMessageObj = {}; // 빈 객체
idMessageObj.normal = "";
idMessageObj.invaild = "알맞은 아이디 형식으로 작성해 주세요.";
idMessageObj.duplication = "";
idMessageObj.check = "존재하는 이메일입니다.";

// 3) 아이디 입력 시 마다 데이더 검사
findPwMemberId?.addEventListener("input", () => {

  
  const inputId = memberId.value.trim();

  // 4) 입력된 아이디이 없을 경우
  if (inputId.length === 0) {
    emailMessage.innerText = idMessageObj.normal;
    emailMessage.classList.remove("confirm", "error");
    checkObj.memberId = false;
    memberId.value = "";
    return;
  }

  // 5) 아이디 유효성 검사(정규 표현식)
  const regEx = /^[a-zA-Z0-9]{3,10}$/; // 한글,영어,숫자로만 3~10글자
  if (regEx.test(inputId) === false) {
    idMessage.innerText = idMessageObj.invalid;
    idMessage.classList.remove("confirm");
    idMessage.classList.add("error");
    checkObj.memberId = false;
    return;

  } else {
    idMessage.innerText = '일치합니다'
  }
  // 6) 아이디 중복 검사
  fetch("findPwEmail?id=" + encodeURIComponent(inputId) + "&email=" + encodeURIComponent(inputEmail))
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("아이디 중복 검사 에러");
    })
    .then(count => {
      if (count == 1) {
        emailMessage.innerText = idMessageObj.duplication;
        emailMessage.classList.remove("confirm");
        emailMessage.classList.add("error");
        checkObj.memberId = false;
        return;
      }

      emailMessage.innerText = emailMessageObj.check;
      emailMessage.classList.remove("error");
      emailMessage.classList.add("confirm");
      checkObj.memberId = true;

    })
    .catch(err => console.error(err));
});

/* ----- 이메일 유효성 검사 ----- */

// 1) 이메일 유효성 검사에 필요한 요소 얻어오기

// 2) 이메일 메시지를 미리 작성
const emailMessageObj = {}; // 빈 객체
emailMessageObj.normal = "";
emailMessageObj.invaild = "알맞은 이메일 형식으로 작성해 주세요.";
emailMessageObj.duplication = "알맞은 이메일을 입력해 주세요";
emailMessageObj.check = "이메일 인증을 받아 주세요";

// 3) 이메일이 입력될 때 마다 유효성 검사를 수행
findPwMemberEmail.addEventListener("input", e => {

  // 입력된 값 얻어오기
  const inputEmail = findPwMemberEmail.value.trim();
  const inputId = findPwMemberId.value.trim();
  
  // 4) 입력된 이메일이 없을 경우
  if(inputEmail.length === 0){
    
    // 이메일 메시지를 normal 상태 메시지로 변경
    emailMessage.innerText = emailMessageObj.normal;

    // #emailMessage에 색상 관련 클래스를 모두 제거
    emailMessage.classList.remove("confirm", "error");

    // checkObj에서 memberEmail을 false로 변경
    checkObj.findPwMemberEmail = false;

    findPwMemberEmail.value = ""; // 잘못 입력된 값(띄어쓰기) 제거
    
    return;
  }


  // 5) 이메일 형식이 맞는지 검사(정규 표현식을 이용한 검사)

  // 이메일 형식 정규 표현식 객체
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 입력 값이 이메일 형식이 아닌 경우
  if( regEx.test(inputEmail) === false ){ 
    emailMessage.innerText = emailMessageObj.invaild; // 유효 X 메시지
    emailMessage.classList.add("error"); // 빨간 글씨 추가
    emailMessage.classList.remove("confirm"); // 초록 글씨 제거
    checkObj.findPwMemberEmail = false; // 유효하지 않다고 체크
    return;
  }

  // 6) 이메일 중복 검사(AJAX)
fetch("findPwEmail?id=" + encodeURIComponent(inputId) + "&email=" + encodeURIComponent(inputEmail))
.then(response => {
  if(response.ok){ // HTTP 응답 상태 코드 200번(응답 성공)
    return response.text(); // 응답 결과를 text로 파싱
  }
  
  // 상태 코드와 오류 메시지 출력 (디버깅용)
  throw new Error("이메일 중복 검사 에러");
})
.then(count => {
  // 매개 변수 count : 첫 번째 then에서 return된 값이 저장된 변수

  if(count == 0 ){  // 아이디랑 이메일이 일치 하지 않음
    emailMessage.innerText = emailMessageObj.duplication; 
    emailMessage.classList.add("error");
    emailMessage.classList.remove("confirm");
    checkObj.findPwMemberEmail = false;
    return;
  } 

  // 일치함
  emailMessage.innerText = emailMessageObj.check; 
  emailMessage.classList.add("confirm");
  emailMessage.classList.remove("error");
  checkObj.findPwMemberEmail = true; // 유효한 이메일임을 기록
})
.catch(err => {
  // catch에서 에러 메시지와 에러 내용을 출력하여 원인을 확인합니다.
  console.error("Error: 이메일 중복 검사 에러", err);
});
});

/*----- 이메일 인증 -----*/

//[1] 인증 번호를 작성된 이메일로 발송하기

// 인증 번호 받기 버튼
const sendFindPwAuthKeyBtn = document.querySelector("#sendFindPwAuthKeyBtn");

// 인증 관련 메시지 출력 span
const authKeyMessage = document.querySelector("#authKeyMessage");

const initTime = "05:00"; // 인증 초기 시간 지정
const initMin = 4; // 초기값 5분에 1초 감소된 후 분
const initSec = 59; // 초기값 5분에 1초 감소된 후 초

// 실제 줄어둔 시간(분/초)를 저장할 변수
let min = initMin;
let sec = initSec;

let authTimer; // 타이머 역할의 setInterval을 저장할 변수
      // -> 타이머를 멈추는 clearInterval 수행을 위해 필요


// 인증 번호 받기 버튼 클릭 시
sendFindPwAuthKeyBtn.addEventListener("click", () => {

  checkObj.authKey = false; // 인증 안된 상태로 기록
  authKeyMessage.innerText = ""; // 인증 관련 메시지 삭제

  if(authTimer != undefined){
    clearInterval(authTimer); // 이전 인증 타이머 없애기
  }

  // 1) 작성된 이메일이 유효하지 않은 경우
  if(checkObj.findPwMemberEmail === false){
    alert("유효한 이메일 작성 후 클릭하세요");
    return;
  }


  // 2) 비동기로 서버에서 작성된 이메일로 인증코드 발송(AJAX)
  fetch("/email/sendFindIdAuthKey", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : findPwMemberEmail.value

    // POST 방식으로 
    // /email/sendAuthKey 요청을 처리하는 컨트롤러에
    // 입력된 이메일을 body에 담아서 제출
  })
  .then(response => {
    if(response.ok) return response.text();
    throw new Error("이메일 발송 실패");
  })
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err));
  alert("인증 번호가 발송 되었습니다");
  authKeyMessage.innerText = initTime; // 05:00 문자열 출력
  authKeyMessage.classList.remove("confirm", "error");// 검정 글씨

  // 1초가 지날 때 마다 함수 내부 내용이 실행되는 setInterval 작성
  authTimer = setInterval(() => {
    authKeyMessage.innerText = `${addZero(min)}:${addZero(sec)}`;

    // 0분 0초인 경우
    if(min === 0 && sec === 0){
      checkObj.authKey = false; // 인증 못했다고 기록
      clearInterval(authTimer); // 1초마다 동작하는 setInterval 멈춤
      authKeyMessage.classList.add("error"); // 빨간 글씨
      authKeyMessage.classList.remove("confirm");
      return;
    }

    if(sec === 0){ // 출력된 초가 0인 경우(1분 지남)
      sec = 60;
      min--; // 분 감소
    }
    sec--; // 1초가 지날 때 마다 sec값 1씩 감소

  }, 1000);
});


/* 전달 받은 숫자가 10 미만(한 자리 수) 인 경우 
 앞에 0을 붙여서 반환하는 함수 */
function addZero(num){
  if(num < 10)  return "0" + num;
  else          return num;
}


//----------------------------------------------------------------

/* 인증 번호를 입력하고 인증하기 버튼을 클릭한 경우 */
const authKey = document.getElementById("authKey");
const checkPwAuthKeyBtn = document.querySelector("#checkPwAuthKeyBtn");

checkPwAuthKeyBtn.addEventListener("click", () => {

  // + (추가 조건) 타이머 00:00인 경우 버튼 클릭 막기
  if(min === 0 && sec === 0){
    alert("인증 번호 입력 제한 시간을 초과하였습니다");
    return;
  }
  
  // 1) 인증 번호 6자리가 입력이 되었는지 확인
  if(authKey.value.trim().length < 6){
    alert("인증 번호가 잘못 입력 되었습니다");
    return;
  }

  // 2) 입력된 이메일과 인증 번호를 비동기로 서버에 전달하여
  // Redis에 저장된 이메일, 인증번호와 일치하는지 확인

  /* AJAX로 여러 데이터를 서버로 전달하고 싶을 땐
    JSON 형태로 값을 전달해야 한다! */

  // 서버로 제출할 데이터를 저장한 객체 생성
  const obj = {
    "email" : findPwMemberEmail.value, // 입력한 이메일
    "authKey" : authKey.value    // 입력한 인증 번호
  };
  
  // JSON.stringify(객체) : 객체 -> JSON 변환(문자열화)
  
  fetch("/email/checkfindIdAuthKey", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(obj)
  })
  .then(response => {
    if(response.ok) return response.text();
    throw new Error("인증 에러");
  })
  .then(result => {
    console.log("인증 결과 : " , result, typeof result);

    // 3) 일치하지 않는 경우
    if(result == 'false'){
      alert("인증 번호가 일치하지 않습니다");
      checkObj.authKey = false;
      return;
    }else{

      // 4) 일치하는 경우
      // - 타이머 멈춤
      clearInterval(authTimer);

      // + "인증 되었습니다" 화면에 초록색으로 출력
      authKeyMessage.innerText = "인증 되었습니다";
      authKeyMessage.classList.add("confirm");
      authKeyMessage.classList.remove("error");

      
      checkObj.authKey = true; // 인증 완료 표시

      location.href = "findIdPw/findPwChangePage?findPwMemberId=" + findPwMemberId.value; 
  
    }
  })
  .catch(err => console.error(err));

});



