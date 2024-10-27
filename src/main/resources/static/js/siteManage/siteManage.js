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


