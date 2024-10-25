const notifyBtn = document.querySelector("#notifyBtn");
notifyBtn.addEventListener("click", () => {
    if (confirm("정말 신고 하시겠습니까?") === false) {
        return;
    }

    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
});

const closeNotifyBtn = document.querySelector("#closeNotifyBtn");
closeNotifyBtn.addEventListener("click", () => {
    if (confirm("신고를 취소하시겠습니까?") === false) {
        return;
    }

    clearForm();
    closePopup();
});

const submitReport = document.querySelector("#submitReport");
submitReport.addEventListener("click", () => {
    const notifyReason = document.getElementById('notifyReason').value;
    const notifyDetails = document.getElementById('notifyDetails').value;
    const reasonError = document.getElementById('reasonError');
    const detailsError = document.getElementById('detailsError');

    reasonError.style.display = 'none'; // 에러 메시지 초기화
    detailsError.style.display = 'none';

    if (notifyReason.value === "null") {
        reasonError.textContent = "신고사유를 선택해주세요";
        reasonError.style.display = 'inline'; // 에러 메시지 표시
        notifyReason.focus();
        e.preventDefault();
    } else if (notifyDetails.value.trim() === 0) {
        alert("신고내용을 자세하게 적어주세요");
        notifyDetails.focus();
        e.preventDefault();
    } else {
        alert('신고가 접수되었습니다.');
        clearForm();
        closePopup();
        return;
    }
});

// 새로운 기능 추가: 신고 사유 선택 시 에러 메시지 제거
const notifyReasonSelect = document.getElementById('notifyReason');
notifyReasonSelect.addEventListener('change', () => {
    if (notifyReasonSelect.value !== "null") {
        reasonError.style.display = 'none';
    }
});

function clearForm() {
    document.getElementById('notifyReason').value = "null";
    document.getElementById('notifyDetails').value = "";
    document.getElementById('reasonError').style.display = 'none'; // 에러 메시지 숨김
    document.getElementById('detailsError').style.display = 'none'; // 에러 메시지 숨김
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}
