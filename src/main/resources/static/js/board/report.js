// 신고 팝업 열기
const reportBtn = document.querySelector("#reportBtn");
reportBtn.addEventListener("click", () => {
    if (!confirm("정말 신고 하시겠습니까?")) {
        return;
    }
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
});

// 신고 팝업 닫기
const closeReportBtn = document.querySelector("#closeReportBtn");
closeReportBtn.addEventListener("click", () => {
    if (!confirm("신고를 취소하시겠습니까?")) {
        return;
    }
    clearForm();
    closePopup();
});

// form 제출 처리
const formTag = document.querySelector("#formTag");
formTag.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const reportReason = document.getElementById('reportReason');
    const reportDetails = document.getElementById('reportDetails');
    const reasonError = document.getElementById('reasonError');
    const detailsError = document.getElementById('detailsError');

    // 에러 메시지 초기화
    reasonError.style.display = 'none';
    detailsError.style.display = 'none';

    // 폼 검증
    if (reportReason.value === "null") {
        reasonError.textContent = "신고사유를 선택해주세요";
        reasonError.style.display = 'inline';
        reportReason.focus();
        return;
    }

    if (reportDetails.value.trim().length === 0) {
        detailsError.textContent = "신고내용을 자세하게 적어주세요";
        detailsError.style.display = 'inline';
        reportDetails.focus();
        return;
    }

    // form에 hidden input 추가
    const reasonInput = document.createElement('input');
    reasonInput.type = 'hidden';
    reasonInput.name = 'reportReason';
    reasonInput.value = reportReason.value;
    formTag.appendChild(reasonInput);
    
    const detailsInput = document.createElement('input');
    detailsInput.type = 'hidden';
    detailsInput.name = 'reportDetails';
    detailsInput.value = reportDetails.value;
    formTag.appendChild(detailsInput);

    // reason 내용과 details 내용을 합쳐야 되는데

    // 모든 검증 통과 시
    const url = location.pathname + "/report";
    formTag.action = url;
    
    try {
        alert('신고가 접수되었습니다.');
        formTag.submit();
        clearForm();
        closePopup();
    } catch (error) {
        console.error('Form submission error:', error);
        alert('신고 접수 중 오류가 발생했습니다.');
    }
});



// 신고 사유 선택 시 에러 메시지 제거
const reportReasonSelect = document.getElementById('reportReason');
reportReasonSelect.addEventListener('change', () => {
    const reasonError = document.getElementById('reasonError');
    if (reportReasonSelect.value !== "null") {
        reasonError.style.display = 'none';
    }
});

// 상세 내용 입력 시 에러 메시지 제거
const reportDetailsInput = document.getElementById('reportDetails');
reportDetailsInput.addEventListener('input', () => {
    const detailsError = document.getElementById('detailsError');
    if (reportDetailsInput.value.trim().length > 0) {
        detailsError.style.display = 'none';
    }
});

// 폼 초기화
function clearForm() {
    document.getElementById('reportReason').value = "null";
    document.getElementById('reportDetails').value = "";
    document.getElementById('reasonError').style.display = 'none';
    document.getElementById('detailsError').style.display = 'none';
    
    // hidden input 제거
    const hiddenInputs = formTag.querySelectorAll('input[type="hidden"]');
    hiddenInputs.forEach(input => input.remove());
}

// 팝업 닫기
function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}