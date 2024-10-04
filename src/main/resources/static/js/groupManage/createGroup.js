/* 기본 */

const createConfirm = {
  "groupName"      : false,
  "groupIntroduce" : false,
  "groupImg"       : false,// 이미지 필수아니라면 삭제
  "category"       : false,
  "groupLimit"     : false
};


/********************************************************************** */
/********************************************************************** */


/* 모임이름 */

// 모임 이름 input 태그
const groupName = document.querySelector("#groupName");
// 모임 이름 유효성검사 메세지 표시
const nameMessage = document.querySelector("#groupNameMessage");
const nameMessageConfirm = {
  "nomal" : "사용할 모임명을 입력 해 주세요",
  "shortage" : "3글자 이상의 이름을 사용해 주십시오.",
  "overlap" : "동일한 이름을 이미 사용중입니다.",
  "statusOk" : "사용 가능한 이름 입니다."
};

// 모임 이름이 입력될때마다 발생할 이벤트
groupName.addEventListener("input", () => {

  const inputName = groupName.value.trim();
  // console.log(inputName);

  // 입력한 글자가 없을때
  if(inputName.length == 0){
    nameMessage.innerText = "";
    nameMessage.innerText = nameMessageConfirm.nomal;
    nameMessage.classList.remove("red");
    nameMessage.classList.remove("green");
    createConfirm.groupName = false;
    return;
  }

  // 3글자 미만일때
  if(inputName.length < 3){
    nameMessage.innerText = "";
    nameMessage.innerText = nameMessageConfirm.shortage;
    nameMessage.classList.add("red");
    nameMessage.classList.remove("green");
    createConfirm.groupName = false;
    return;
  }
  
  // 중복되는 이름일때
  fetch("/groupManage/groupNameCheck?inputName=" + inputName)
  .then(response=>{
    if(response.ok) return response.text();
    throw new Error("모임이름검사 오류 : " + response.sratus)
  })
  .then(result => {
    if(result > 0){
      // 중복되는 경우가 있는 경우
      nameMessage.innerText = "";
      nameMessage.innerText = nameMessageConfirm.overlap;
      nameMessage.classList.add("red");
      nameMessage.classList.remove("green");
      createConfirm.groupName = false;
      return;
    }
  })
  .catch(error => console.error(error));
  
  // 사용 가능한 이름일 경우
  nameMessage.innerText = "";
  nameMessage.innerText = nameMessageConfirm.statusOk;
  nameMessage.classList.remove("red");
  nameMessage.classList.add("green");
  createConfirm.groupName = true;
  return;

});


/********************************************************************** */
/********************************************************************** */


/* 모임소개 */

// 모임소개 택스트에어리어
const groupIntroduce = document.querySelector("#groupIntroduce");

/* 작성 여부만 확인 */
groupIntroduce.addEventListener("input", ()=>{

  const inputIntroduce = groupIntroduce.value.trim();

  if(inputIntroduce.length > 0){
    createConfirm.groupIntroduce = true;
    return;
  } else {
    createConfirm.groupIntroduce = false;
  }

});



/********************************************************************** */
/********************************************************************** */


/* 모임 이미지 */

// 미리보기 이미지 표시할 곳
const inputImg = document.querySelector("#inputImg");
// 이미지 선택
const imgInput = document.querySelector("#imgInput");
// 이미지 선택시 선택파일의 이름을 표시
const imgName = document.querySelector("#imgName");

// 마지막으로 선택했던 이미지
let lastInputImg = null;
// 기본이미지 or 선택이미지 상태변수
// 기본이미지 가능하게 할거면 createConfirm 에서 groupImg 제거해야함
// -1 : 기본이미지
// +1 : 사용자 정의 이미지
let imgStatus = -1;


// 이미지를 선택하여 미리보기 함수를 호출할 경우
const inputPreview = (img) => {

  // 이미지 상태변수 => 사용자 정의이미지
  imgStatus = 1;

  lastInputImg = img;

  // JS에서 제공하는 파일을 읽어오는 객체
  const reader = new FileReader();

  // 파일을 읽어오는데 DataURL 형식으로 읽어옴
  // DataURL : 파일 전체 "데이터"가 브라우저가 해석할 수 있는 긴 주소형태의 "문자열"로 변환이 됨
  reader.readAsDataURL(img);

  // 선택된 파일이 다 인식되었을때
  reader.addEventListener("load", e => {

    inputImg.src=e.target.result;
    // 파일리더의 결과( (주소처럼생긴)문자열 )의 결과(주소)를 참조주소값에 대입

  })
};

// 이미지 input에 이미지가 선택, 취소 된 경우
imgInput.addEventListener("change", e => {
  const img = e.target.files[0];

  // input 태그를 취소한 경우
  if(img === undefined){

    // 선택한적 없이 취소한 경우
    if(lastInputImg === null) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(lastInputImg);
    // -> lastVaildFile을 요소로 포함한 FileList가 생성이 됨
    // dataTransfer가 가지고 있는 files 필드에 lastVaildFile 추가
    
    // input의 files 변수에 lastVaildFile이 추가된 files 대입
    imgInput.files = dataTransfer.files;

    // 이전 선택된 파일로 미리보기 되돌리기(없어도 되긴 함)
    updatePreview(lastInputImg);

    // 선택된 파일이 없으면 돌아가고, 있으면 미리보기함수를 호출
    return;
  }

  // 미리보기 함수 호출
  inputPreview(img);
});

// 선택취소버튼 클릭시
// 모임 이미지가 필수라면 삭제
const deleteImg = document.querySelector("#deleteImg");
deleteImg.addEventListener("click", () => {
  // 미리보기를 기본이미지로 변경
  // updatePreview(groupDefaultImage);
  inputImg.src=groupDefaultImage;

  // input태그와 마지막 선택된 파일을 저장하는 lastValidFile에 저장된 값을 모두 삭제
  imgInput.files = ''; // 기본이미지는 없으면 기본이 뜨니까 파일 저장해 줄 필요 없음
  lastInputImg = null;

  // 프로필 이미지 상태 구분용 변수 수정
  statusCheck = -1;
});



/********************************************************************** */
/********************************************************************** */


/* 카테고리 */

// 카테고리 라디오버튼 아무거나 선택하면 true
document.querySelectorAll('[name="category"]').forEach(e => {
  e.addEventListener("click", ()=>{
    createConfirm.category = true;
  });
});

/* 카테고리 리스트 */

/********************************************************************** */
/********************************************************************** */


/* 가입제한 */
/* 
제한 없음 이외의 태그들을 체크했을때
제한사항에 대해 작성하지 않으면 createConfirm false
*/