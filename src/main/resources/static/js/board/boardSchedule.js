function attendSchedule(scheduleNo) {
  fetch('/board/attendSchedule', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: scheduleNo
  })
  .then(response => {
          console.log(response);
  })
  .catch(error => {
      console.error('참석 요청 중 오류 발생:', error);
  });
}

document.querySelectorAll('.attend').forEach(button => {
  button.addEventListener('click', () => {
      // 현재 클릭된 버튼의 schedule-box 부모 요소 찾기
      const scheduleBox = button.closest('.schedule-box');
      
      // 해당 schedule-box 내부의 .input 요소에서 scheduleNo 가져오기
      const scheduleNo = scheduleBox.querySelector('.input').innerText;

      console.log(scheduleNo);
      
      // attendSchedule 함수 호출
      attendSchedule(scheduleNo);
  });
});

