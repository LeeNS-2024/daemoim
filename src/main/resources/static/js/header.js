
    // 팝업 불러오기 함수
    const popupViewCheck = () => {

      
      fetch("/popup/popupCheck")
      .then(response => {
        if(response.ok) return response.json();
        throw new Error("popup창 실패");
      })
      .then(map => {

        console.log("popup result : ", map.result);

        // 결과 0이면 종료
        if(map.result === 0 ) return;
        
        // 전달받은 이미지 표시
        const popupImage = document.getElementById("popupImage");
        popupImage.src = map.popup.popupLocation + map.popup.popupRename;
        
        // 이미지가 로드된 후 창 크기 변경
        popupImage.onload = function() {

          const popupView = document.querySelector(".popup-view");

          // 이미지의 실제 크기를 기준으로 창 크기 설정
          popupView.style.width = `${popupImage.naturalWidth}px`;
          popupView.style.height = `${popupImage.naturalHeight}px`;

          // 창 위치설정
          popupView.style.top = map.popup.popupUp + 'vh';
          popupView.style.left = map.popup.popupLeft + 'vw';

          popupView.classList.remove("display-non");
        };

      })
      .catch(err => console.error(err));

    };

    // 팝업창 닫기버튼 함수
    const addPopupcloseBtn = () => {
      const popupCheckClose = document.querySelector("#popupCheckClose");
      popupCheckClose.addEventListener("submit", e => {
        e.preventDefault();
        const popupCheck = document.querySelector("#popupCheck");
        let check = 0;
        if(popupCheck.checked == true) {
          // + 체크 활성화시 쿠키남기기 ajax 실행
          check = 1;
        }

        // 되돌려서 세션에 팝업 열었다고 남기고,
        // 하루동안 안뜨게 했으면 쿠키남기기
        fetch("/popup/popupClose?check=" + check)
        .then(response=>{
          if(response.ok === true) console.log("체팅닫기잘됨");
          if(response.ok === false) throw new Erroe("체팅닫기오류");
        })
        .catch(err => console.error(err));

        // 비동기 보내놓고 창 닫기
        const popupView = document.querySelector(".popup-view");
        popupView.classList.add("display-non");

      });
    };

    // 페이지 로딩시 함수세팅
    document.addEventListener("DOMContentLoaded", ()=>{
      if(document.querySelector(".popup-view") !== null){
        popupViewCheck();
        addPopupcloseBtn();
      }
    });



// ----------------------------------------------------------------
const connectSSE = () => {

  if(notificationLoginCheck === false) return;

  const eventSource = new EventSource("/sse/connect")
}