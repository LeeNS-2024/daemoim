const commentListArea = document.querySelector(".comment-list-area");

// 댓글 목록 조회
const selectCommentList = () => {

  fetch("/board/commentList?boardNo=" + location.pathname.split("/")[4])
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("댓글 목록 조회 실패")
    })
    .then(html => {

      commentListArea.innerHTML = html;


      addEventChildCommentCheck();
      addEventDeleteCommentCheck();
      addEventUpdateCommentCheck();

    })
    .catch(err => console.error(err));
};


// 댓글 내용
const commentContent = document.querySelector("#commentContent");

// 댓글 등록
const insertComment = (parentCommentNo) => {

  const data = {};
  data.boardNo = boardNo;
  data.commentContent = commentContent.value;

  if (parentCommentNo !== undefined) {
    data.parentCommentNo = parentCommentNo;

    data.commentContent = document.querySelector(".child-comment-content").value;
  }

  // Ajax
  fetch("/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("댓글 등록 실패");
    })
    .then(commentNo => {
      if (commentNo == 0) {
        alertM("댓글 등록 실패");
        return;
      }

      alertM("댓글이 등록 되었습니다.")
      commentContent.value = "";
      selectCommentList();

      // {닉네임}님이 {게시글 제목} 게시글에 댓글을 작성했습니다
      // 알림 클릭 시 작성된 댓글 또는 답글 위치로 바로 이동
      // if (parentCommentNo === undefined) {
      //   const content = `<string>${memberNickname}</string>님이 <strong>${boardDetail.boardTitle}</strong> 게시글에 댓글을 작성했습니다`

      //   // type, url, pkNo, content
      //   sendNotification(
      //     "insertComment",
      //     `${location.pathname}?cn=${commentNo}`,
      //     boardDetail.boardNo,
      //     content
      //   );
      // }
      // else {
      //   const content = `<string>${memberNickname}</string>님이 <strong>${boardDetail.boardTitle}</strong> 답글을 작성했습니다`

      //   // type, url, pkNo, content
      //   sendNotification(
      //     "insertChildComment",
      //     `${location.pathname}?cn=${commentNo}`,
      //     parentCommentNo,
      //     content
      //   );
      // }
    })
    .catch(err => console.error(err));
}

// 답글 버튼 클릭 시 confirm 띄우는 함수
const ChildCommentCheck = (btn) => {

  if (loginCheck === false) {
    alertM("로그인 후 이용해주세요");
    return;
  }

  // 입력칸 1개만 나오도록 설정
  const temp = document.querySelectorAll(".child-comment-content");

  if (temp.length > 0) {
    confirmM("다른 답글을 작성 중입니다. 현재 댓글에 답글을 작성 하시겠습니까?")
      .then(result => {
        if (!result) return;

        temp[0].nextElementSibling.remove();
        temp[0].remove();
        ChildComment(btn);
      })
  } else {
    ChildComment(btn);
  }
}



// 댓글 삭제 확인 confirm
const deleteCommentCheck = (btn) => {

  confirmM("정말 삭제 하시겠습니까?")
    .then(result => {
      if (!result) return;
      deleteComment(btn);
    })
}

/* 백업된 댓글을 저장할 변수 */
let beforeCommentRow;

//  댓글 수정 confirm 출력하면서 코드실행
const UpdateCommentCheck = (btn) => {

  /* 댓글 수정 화면이 1개만 열려 있을 수 있게 하기 */
  const temp = document.querySelectorAll(".update-textarea");

  if(temp.length > 0){
  confirmM("수정중인 댓글이 있습니다." + "현재 댓글을 수정하시겠습니까?")
    .then(result => {
      if (!result) return;

      const commentRow = temp.parentElement; // 열려있는 댓글행
      commentRow.after(beforeCommentRow); // 백업본을 다음 요소로 추가
      commentRow.remove(); // 열려있던 행 삭제

                              // 클릭된 답글 버튼이 속해있는 댓글(li) 찾기
                          const li = btn.closest("li");

                          // 답글이 작성되는 댓글(부모 댓글) 번호 얻어오기
                          const parentCommentNo = li.dataset.commentNo;


                          // 답글을 작성할 textarea 요소 생성
                          const textarea = document.createElement("textarea");
                          textarea.classList.add("child-comment-content");

                          li.append(textarea);

                          // 답글 버튼 영역 + 등록/취소 버튼 생성 및 추가
                          const commentBtnArea = document.createElement("div");
                          commentBtnArea.classList.add("update-comment-btn");
                          
                          const insertBtn = document.createElement("button");
                          insertBtn.innerText = "수정";
                          
                          /* 등록 버튼 클릭 시 댓글 등록 함수 호출(부모 댓글 번호 전달)  */
                          insertBtn.addEventListener("click", () => insertComment(parentCommentNo));
                          
                          const cancelBtn = document.createElement("button");
                          cancelBtn.classList.add("delete-comment-btn");
                          cancelBtn.innerText = "취소";

                          // 취소버튼 -> 답글 작성영역 삭제
                          cancelBtn.addEventListener("click", () => {

                            li.lastElementChild.remove(); // li (부모요소에) lastElementChild
                            li.lastElementChild.remove();
                          });

                          // 답글 버튼 영역의 자식으로 등록/취소 버튼 추가
                          commentBtnArea.append(insertBtn, cancelBtn);

                          // 답글 버튼 영역을 화면에 추가된 textarea 뒤쪽에 추가
                          textarea.after(commentBtnArea);

      // 백업본 버튼에 이벤트 추가
      const updateCommentBtn = beforeCommentRow.querySelector(".update-comment-btn"); // 수정
      const deleteCommentBtn = beforeCommentRow.querySelector(".delete-comment-btn"); // 취소

      updateCommentBtn.addEventListener("click", () => UpdateCommentCheck(updateCommentBtn));
      deleteCommentBtn.addEventListener("click", () => deleteCommentCheck(deleteCommentBtn));
      createUpdateArea(btn);
    });
  } else {
                              // 클릭된 답글 버튼이 속해있는 댓글(li) 찾기
                              const li = btn.closest("li");

                              // 답글이 작성되는 댓글(부모 댓글) 번호 얻어오기
                              const parentCommentNo = li.dataset.commentNo;
    
    
                              // 답글을 작성할 textarea 요소 생성
                              const textarea = document.createElement("textarea");
                              textarea.classList.add("child-comment-content");
    
                              li.append(textarea);
    
                              // 답글 버튼 영역 + 등록/취소 버튼 생성 및 추가
                              const commentBtnArea = document.createElement("div");
                              commentBtnArea.classList.add("update-comment-btn");
                              
                              const insertBtn = document.createElement("button");
                              insertBtn.innerText = "수정";
                              
                              /* 등록 버튼 클릭 시 댓글 등록 함수 호출(부모 댓글 번호 전달)  */
                              insertBtn.addEventListener("click", () => insertComment(parentCommentNo));
                              
                              const cancelBtn = document.createElement("button");
                              cancelBtn.classList.add("delete-comment-btn");
                              cancelBtn.innerText = "취소";
    
                              // 취소버튼 -> 답글 작성영역 삭제
                              cancelBtn.addEventListener("click", () => {
    
                                li.lastElementChild.remove(); // li (부모요소에) lastElementChild
                                li.lastElementChild.remove();
                              });
    
                              // 답글 버튼 영역의 자식으로 등록/취소 버튼 추가
                              commentBtnArea.append(insertBtn, cancelBtn);
    
                              // 답글 버튼 영역을 화면에 추가된 textarea 뒤쪽에 추가
                              textarea.after(commentBtnArea);
    
          // 백업본 버튼에 이벤트 추가
          const updateCommentBtn = beforeCommentRow.querySelector(".update-comment-btn"); // 수정
          const deleteCommentBtn = beforeCommentRow.querySelector(".delete-comment-btn"); // 취소

    updateCommentBtn.addEventListener("click", () => UpdateCommentCheck(updateCommentBtn));
    deleteCommentBtn.addEventListener("click", () => deleteCommentCheck(deleteCommentBtn));
    createUpdateArea(btn);
  }

}
const createUpdateArea = (btn) => {
// 1. 수정하려는 댓글(li) 요소 얻어오기
const commentRow = btn.closest("li");
const commentNo = commentRow.dataset.commentNo; // 댓글 번호

// 2. 취소 버튼 동작에 대비하여
//    현재 댓글 (commentRow)의 요소를 복제해서 백업
beforeCommentRow = commentRow.cloneNode(true);

/* 요소.cloneNode(true);
  - 요소 복제하여 반환
  - 매개변수 true : 복제하려는 요소의 하위 요소들도 복제
*/

// 3. 기존 댓글에 작성된 내용만 얻어오기 
let beforeContent = commentRow.children[1].innerText;

// 4. 댓글 행 내부를 모두 삭제
commentRow.innerHTML = "";

// 5. textarea 생성 + 클래스 추가 + 내용 추가
const textarea = document.createElement("textarea");
textarea.classList.add("update-textarea");
textarea.value = beforeContent;

// 6. 댓글 행에 textarea 추가
commentRow.append(textarea);

// 7. 버튼 영역 생성
const commentBtnArea = document.createElement("div");
commentBtnArea.classList.add("comment-btn-area");

// 8. 수정 버튼 생성
const commentUpdateBtn = document.createElement("button");
commentUpdateBtn.innerText = "수정";

// 수정 버튼 클릭 시 댓글 수정 (ajax)
commentUpdateBtn.addEventListener("click", () => {
  const data = {
    "commentNo": commentNo,
    "commentContent": textarea.value
  }

  fetch("/comment", {
    method: "PUT",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("댓글 수정 실패");
    })
    .then(result => {
      if (result > 0) {
        alertM("댓글이 수정 되었습니다.");
        selectCommentList(); // 댓글 목록 비동기 조회
      } else {
        alertM("댓글 수정 실패");
      }
    })
    .catch(err => console.error(err));
})

// 9. 취소 버튼 생성
const cancelBtn = document.createElement("button");
cancelBtn.innerText = "취소";

cancelBtn.addEventListener("click", () => {

  // 취소 안 함 -> 수정 진행
  if (confirm("취소하시겠습니까?") === false) return;

  // 현재 댓글 행 다음위치에 백업한 원본 댓글 추가
  commentRow.after(beforeCommentRow);
  commentRow.remove(); // 수정 화면으로 변환된 행 삭제


  /* 원상 복구된 댓글의 버튼에 이벤트 추가하기 */
  const childCommentBtn
    = beforeCommentRow.querySelector(".child-comment-btn");

  childCommentBtn.addEventListener("click", () => {
    ChildCommentCheck(childCommentBtn);
  });


  const updateCommentBtn
    = beforeCommentRow.querySelector(".update-comment-btn");

  updateCommentBtn.addEventListener("click", () => {
    UpdateCommentCheck(updateCommentBtn);
  });


  const deleteCommentBtn
    = beforeCommentRow.querySelector(".delete-comment-btn");

  deleteCommentBtn.addEventListener("click", () => {
    deleteCommentCheck(deleteCommentBtn);
  })

})

// 10. 버튼 영역에 수정/취소 버튼 추가 후
//     댓글 행에 버튼 영역 추가
commentBtnArea.append(commentUpdateBtn, cancelBtn);
commentRow.append(commentBtnArea);
}

/* confirmM에 사용하는 구문들 모아두는 영역 */


// ***** 답글 버튼 클릭 시 댓글 작성영역 추가하는 함수 *****
const ChildComment = (btn) => {
  // 클릭된 답글 버튼이 속해있는 댓글(li) 찾기
  const li = btn.closest("li");

  // 답글이 작성되는 댓글(부모 댓글) 번호 얻어오기
  const parentCommentNo = li.dataset.commentNo;


  // 답글을 작성할 textarea 요소 생성
  const textarea = document.createElement("textarea");
  textarea.classList.add("child-comment-content");

  li.append(textarea);

  // 답글 버튼 영역 + 등록/취소 버튼 생성 및 추가
  const commentBtnArea = document.createElement("div");
  commentBtnArea.classList.add("comment-btn-area");

  const insertBtn = document.createElement("button");
  insertBtn.innerText = "등록";

  /* 등록 버튼 클릭 시 댓글 등록 함수 호출(부모 댓글 번호 전달)  */
  insertBtn.addEventListener("click", () => insertComment(parentCommentNo));

  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "취소";

  // 취소버튼 -> 답글 작성영역 삭제
  cancelBtn.addEventListener("click", () => {

    li.lastElementChild.remove(); // li (부모요소에) lastElementChild
    li.lastElementChild.remove();
  });

  // 답글 버튼 영역의 자식으로 등록/취소 버튼 추가
  commentBtnArea.append(insertBtn, cancelBtn);

  // 답글 버튼 영역을 화면에 추가된 textarea 뒤쪽에 추가
  textarea.after(commentBtnArea);
}






// ****** 댓글 삭제 *****
const deleteComment = (btn) => {
  // 삭제할 댓글 번호 얻어오기
  const li = btn.closest("li"); // 댓글 또는 답글
  const commentNo = li.dataset.commentNo; // 댓글 번호

  fetch("/comment", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: commentNo
  })
    .then(response => { // fetch를 실행했을때 여기로 값을 받을래
     
      if (response.ok) return response.text();
      throw new Error("댓글 삭제 실패");
    })
    .then(result => {
      if (result > 0) {
        alertM("삭제되었습니다");
        selectCommentList(); // 댓글 목록 비동기 조회 후 출력
      } else alertM("삭제 실패");
    })
    .catch(err => console.error(err));
}






/* 이벤트 추가 구문을 모아두는 영역 */

/* 댓글 등록 버튼 클릭 동작 추가 */
const addComment = document.querySelector("#addComment");
addComment.addEventListener("click", () => {

  //  1) 로그인 여부 검사(boardDetail.html의 lohinCheck 전역변수)
  if (loginCheck === false) {
    alertM("로그인 후 이용해 주세요");
    return;
  }
  // 2) 댓글 작성 여부 검사
  if (commentContent.value.trim().length === 0) {
    alertM("내용 작성 후 등록 버튼을 클릭해주세요");
    return;
  }
  // 3) 1,2 통과 시 댓글 등록 함수 호출
  insertComment();
})

/* 화면에 존재하는 답글 버튼을 모두 찾아 이벤트 리스너 추가 */
const addEventChildCommentCheck = () => {

  const btns = document.querySelectorAll(".child-comment-btn");

  // forEach : 향상된 for 문
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      ChildCommentCheck(btn); // 답글 작성 화면 출력 함수 호출
    });
  })
}

/** 화면에 존재하는 모든 댓글 삭제 버튼에 이벤트 리스너 추가하는 함수 */
const addEventDeleteCommentCheck = () => {
  const btns = document.querySelectorAll(".delete-comment-btn");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      deleteCommentCheck(btn); // 클릭 시 deleteCommentCheck() 함수 호출
    })
  });
}


/** 화면에 존재하는 댓글 수정 버튼에 이벤트 리스너 추가 */
const addEventUpdateCommentCheck = () => {
  const btns = document.querySelectorAll(".update-comment-btn");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      UpdateCommentCheck(btn);   // 수정버튼 클릭 시 UpdateCommentCheck() 호출
    })
  })
}

  /* 화면 코드 해석 완료 후*/
document.addEventListener("DOMContentLoaded", () => {
  addEventChildCommentCheck();  // 답글 버튼에 이벤트 추가
  addEventDeleteCommentCheck(); // 삭제 버튼에 이벤트 추가
  addEventUpdateCommentCheck(); // 수정 버튼에 이벤트 추가
});




