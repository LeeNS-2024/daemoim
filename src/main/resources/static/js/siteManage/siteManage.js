document.getElementById("suspendForm").addEventListener("submit", e => {
  // 기본 폼 제출 동작 방지
  e.preventDefault();

  var email = document.getElementById("email").value;
  var days = document.getElementById("days").value;
  var reason = document.getElementById("reason").value;

  // 입력값 검증
  if (email === "" || days === "" || reason === "") {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  // 폼을 서버로 제출
  e.target.submit();
});


document.getElementById("resignForm").addEventListener("submit", e => {

  // 기본 폼 제출 동작 방지
  e.preventDefault();

  var email = document.getElementById("email2").value;
  var reason = document.getElementById("reason2").value;

  // 입력값 검증
  if (email === "" || reason === "") {
    alert("모든 항목을 입력해주세요");
    return;
  }

  e.target.submit();

});

/* 모달 */
function showReportDetailModal(reportNo) {
  console.log(reportNo);
  fetch(`/siteManage/detail/${reportNo}`)
    .then(response => response.json())
    .then(data => {
      // data에 신고 상세 내용이 담겨있음
      document.getElementById("modalReportDetail").innerText = data.reportDetail;
      document.getElementById("reportDetailModal").style.display = "block"; // 모달 열기
      const viewStatus = document.querySelectorAll(".report-view-status");
      viewStatus?.forEach(view => {
        if (view.dataset.reportNo == reportNo) {
          view.innerText = "확인완료";
        }
      })
    })
    .catch(error => console.error('error:', error));
}


const addReportEvent = () => {
  const reportDetailArr = document.querySelectorAll(".reportDetail");
  reportDetailArr?.forEach(reportDetail => {
    reportDetail.addEventListener("click", () => {
      const reportNo = reportDetail.dataset.reportNo;

      showReportDetailModal(reportNo);
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  addReportEvent();
  reportDelete();
})


const reportDelete = () => {
  console.log("삭제버튼함수실행");
  
  const deleteReport = document.querySelectorAll(".deleteReport")
  deleteReport?.forEach(deleteReport => {
    deleteReport.addEventListener("click", () => {
      console.log("삭제버튼실행");
      const reportNo = deleteReport.dataset.reportNo;
      fetch(`/siteManage/delete/${reportNo}`)
        .then(response => response.json())
        .then(data => {
     

          const reportTr = document.querySelectorAll(".report-tr");

          
          reportTr?.forEach(tr => {
            if (tr.dataset.reportNo == reportNo) {
              tr.remove();
            }
          })
        })
        .catch(error => console.error('error:', error));
  

    })
})

}

/* 조회 여부 없데이트 */
/*function updateReportViewStatus(reportNo){
  fetch(`/siteManage/updateReportView/${reportNo}`, {method : 'POST'})
  .then(response => {

    if(response.ok){
      const reportViewCell = document.getElementsByClassName(`report-view-status`);
      if(reportViewCell){
        reportViewCell.innerText = '조회O';
      }
    }else{
      console.error("조회여부 변경 실패야!!!!!!!!!!!!");
    }

  })
} */

/* 모달창 닫기 */
function closeModal() {
  document.getElementById("reportDetailModal").style.display = "none"; // 모달 닫기
}

/* 회원목록 전체보기 */

function toggleRows() {
  // 숨겨진 행과 버튼 참조
  const hiddenRows = document.querySelectorAll(".hidden-row");
  const button = document.getElementById("toggleButton");

  // 토글하여 전체보기 또는 기본보기 상태 설정
  if (button.textContent === "전체보기") {
      hiddenRows.forEach(row => row.style.display = "table-row");
      button.textContent = "기본보기";
  } else {
      hiddenRows.forEach(row => row.style.display = "none");
      button.textContent = "전체보기";
  }
}