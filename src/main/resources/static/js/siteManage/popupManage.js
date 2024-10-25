

// 이미지 입력시
// input태그
const popupImage = document.getElementById("popupImage");
const popupLeft = document.getElementById("popupLeft");
const popupTop = document.getElementById("popupUp");
const inputImgPreview = document.querySelector(".inputImgPreview");


// 백업용 이미지
let lastImg = null;


/* input에 이미지가 변한경우 */
popupImage?.addEventListener("change", e=>{
  console.log("이미지입력");
  const file = e.target.files[0];
  
  if(file === undefined){
    console.log("선택취소됨");
    if(lastImg === null) return;
    backupLoad(i);
    return;
  }

  if(file.size > 1*1024*1024*1){
    alert("파일크기가 10MB를 초과합니다");
    backupLoad(i);
    return;
  }

  imgPreviewFunction(file);

}) // inputImage event end

const backupLoad = () => {
  console.log("백업이미지입력");
  const transfer = new DataTransfer();
  if(lastImg == null) return;
  transfer.items.add(lastImg);
  popupImage.files = transfer.files;
};

const imgPreviewFunction = (file) => {

  console.log("파일 식별됨");

  lastImg = file;
  
  // 입력받은 파일을 미리보기창에 url형태로 전달
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", e => {
    console.log("이미지로딩완료");
    inputImgPreview.style.top = (popupTop.value * 7.81) + 'px';
    inputImgPreview.style.left = (popupLeft.value * 16) + 'px';
    inputImgPreview.src=e.target.result;
    inputImgPreview.classList.remove("display-none");
    
  });
  
}; // imgPreviewFuntion() end

popupLeft?.addEventListener("change", ()=>{
  const left = popupLeft.value;
  inputImgPreview.style.left = (left * 16) + 'px';
})
popupTop?.addEventListener("change", ()=>{
  const top = popupTop.value;
  inputImgPreview.style.top = (top * 7.81) + 'px';
})

/********************************************************** */

// form 제출 막기
const inputForm = document.querySelector("#inputForm");
inputForm.addEventListener("submit", e=>{
  if(popupImage.files[0] === undefined) e.preventDefault();
})