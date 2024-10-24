// 현재 상세 조회한 게시글 번호
const boardNo = location.pathname.split("/")[4];

/* 좋아요 하트 클릭 시 */
const boardLike = document.querySelector("#boardLike");
boardLike.addEventListener("click", e => {
  // 1. 로그인 여부 검사
  if(loginCheck === false){
    alert("로그인 후 이용해 주세요");
    return;
  }

  // 2. 비동기로 좋아요 요청
  fetch("/board/like", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : boardNo
  })
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("좋아요 실패");
  })
  .then(result => {
    if(result.check === 'insert'){ // 채우기
      boardLike.classList.add("fa-solid");
      boardLike.classList.remove("fa-regular");

      // 게시글 작성자에게 알림 보내기
      const content = `<strong>${memberNickname}</strong>님이 <strong>${boardDetail.boardTitle}</strong> 게시글을 좋아합니다`;
      
      sendNotification( // type, url, pkNo, content
        "boardLike",
        location.pathname,
        boardDetail.boardNo,
        content
      );

    } else { // 비우기
      boardLike.classList.add("fa-regular");
      boardLike.classList.remove("fa-solid");
    }

    boardLike.nextElementSibling.innerText = result.count;
  })
  .catch(err => console.error(err));
});

/* 삭제 버튼 클릭 시 */
const deleteBtn = document.querySelector("#deleteBtn");
deleteBtn?.addEventListener("click", () => {
  if(confirm("정말 삭제 하시겠습니까?") == false){
    return;
  }

  const form  = document.createElement("form");
  form.action = "/editBoard/delete";
  form.method = "POST";

  const input = document.createElement("input");
  input.type  = "hidden";
  input.name  = "boardNo";
  input.value = boardNo;

  form.append(input);
  document.querySelector("body").append(form);
  form.submit();
});

/* 수정 버튼 클릭 시 */
const updateBtn = document.querySelector("#updateBtn");
updateBtn?.addEventListener("click", () => {
  const form  = document.createElement("form");
  form.action = location.pathname.replace("board","editBoard") + "/updateView";
  form.method = "POST";
  
  document.querySelector("body").append(form);
  form.submit();
});

/* 목록으로 버튼 클릭 시 */
const goToListBtn = document.querySelector("#goToListBtn");
goToListBtn.addEventListener("click", () => {
  const limit = 10; // 이미지 게시판은 한 페이지당 10개씩 표시

  let url = location.pathname + "/goToList?limit=" + limit;

  const params = new URLSearchParams(location.search);

  if(params.get("key") !== null){
    url += `&key=${params.get("key")}&query=${params.get("query")}`;
  }

  location.href = url;
});

// 이미지 클릭 시 크게 보기
document.querySelectorAll('.image-item img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', () => {
      modal.remove();
    });
  });
});