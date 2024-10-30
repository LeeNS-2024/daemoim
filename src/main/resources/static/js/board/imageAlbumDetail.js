// 전역 변수
const boardNo = location.pathname.split("/")[4];
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeBtn = document.getElementsByClassName("modal-close")[0];

// 이미지 클릭 시 모달 표시
document.querySelectorAll('.image-item img').forEach(img => {
  img.addEventListener('click', function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    modalCaption.textContent = this.alt;
  });
});

// 모달 닫기
closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});

// 좋아요 기능
const boardLike = document.querySelector("#boardLike");
boardLike.addEventListener("click", e => {
  if (loginCheck === false) {
    alert("로그인 후 이용해 주세요");
    return;
  }

  fetch("/board/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: boardNo
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("좋아요 실패");
    })
    .then(result => {
      if (result.check === 'insert') {
        boardLike.classList.add("fa-solid");
        boardLike.classList.remove("fa-regular");

        const content = `<strong>${memberNickname}</strong>님이 <strong>${boardDetail.boardTitle}</strong> 게시글을 좋아합니다`;

        sendNotification(
          "boardLike",
          location.pathname,
          boardDetail.boardNo,
          content
        );
      } else {
        boardLike.classList.add("fa-regular");
        boardLike.classList.remove("fa-solid");
      }
      boardLike.nextElementSibling.innerText = result.count;
    })
    .catch(err => console.error(err));
});

// 삭제 기능
const deleteBtn = document.querySelector("#deleteBtn");
deleteBtn?.addEventListener("click", () => {
  if (!confirm("정말 삭제 하시겠습니까?")) return;

  const form = document.createElement("form");
  form.action = "/editBoard/delete";
  form.method = "POST";

  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "boardNo";
  input.value = boardNo;

  form.append(input);
  document.body.append(form);
  form.submit();
});

// 수정 페이지로 이동
const updateBtn = document.querySelector("#updateBtn");
updateBtn?.addEventListener("click", () => {
  const form = document.createElement("form");
  form.action = location.pathname.replace("board", "editBoard") + "/updateView";
  form.method = "POST";

  document.body.append(form);
  form.submit();
});

// 목록으로 이동
const goToListBtn = document.querySelector("#goToListBtn");
goToListBtn.addEventListener("click", () => {
  const limit = 10;
  let url = location.pathname + "/goToList?limit=" + limit;

  const params = new URLSearchParams(location.search);
  if (params.get("key") !== null) {
    url += `&key=${params.get("key")}&query=${params.get("query")}`;
  }

  location.href = url;
});

// 신고 기능
const reportBtn = document.querySelector("#reportBtn");
reportBtn?.addEventListener("click", () => {
  if (!loginCheck) {
    alert("로그인 후 이용해 주세요");
    return;
  }
});