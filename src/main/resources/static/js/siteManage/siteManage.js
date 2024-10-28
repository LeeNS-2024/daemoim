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
  if(email === "" || reason === "" ){
    alert("모든 항목을 입력해주세요");
    return;
  }

  e.target.submit();

});

// 모달 열기 함수
function showReportDetailModal(reportNo) {
  // 신고 상세 내용 불러오기
  fetch(`/siteManage/report/detail/${reportNo}`)
      .then(response => response.json())
      .then(data => {
          document.getElementById('reportDetailText').textContent = data.reportDetail; // 신고 내용을 모달에 표시
          document.getElementById('reportDetailModal').style.display = "block";

          // 조회 여부 업데이트 요청
          updateReportViewStatus(reportNo);
      })
      .catch(error => console.error('Error fetching report detail:', error));
}

// 조회 여부 업데이트 함수
function updateReportViewStatus(reportNo) {
  fetch(`/siteManage/report/view/${reportNo}`, {
      method: 'POST'
  })
  .then(response => {
      if (response.ok) {
          // 성공적으로 조회 여부가 업데이트되면 테이블에서 조회 상태를 변경
          document.querySelector(`[onclick="showReportDetailModal(${reportNo})"]`).closest('tr').querySelector('.report-view-status').textContent = '조회O';
      }
  })
  .catch(error => console.error('Error updating report view status:', error));
}

// 모달 닫기 함수
function closeModal() {
  document.getElementById('reportDetailModal').style.display = "none";
}


