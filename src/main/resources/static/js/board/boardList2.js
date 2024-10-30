const pageNoList = document.querySelectorAll(".pagination a");

const urlParts = window.location.href.split("/");

let boardTypeCode = 1;

$(function () {
  // Datepicker를 #calendar에 적용
  $("#calendar").datepicker({
    dateFormat: 'yy-mm-dd', // 날짜 형식
    onSelect: function(dateText, inst) {
     // 날짜 셀 클릭 시에만 이동
     if ($(inst.dpDiv.find('.ui-state-active')).length) {
      const baseUrl = "/board/boardCalendar/" + urlParts[urlParts.length - 1];
      window.location.href = `${baseUrl}`;
     }
    }
  });
});

const bannerList = document.querySelectorAll(".banner");

bannerList.forEach(item => {
  
  item.addEventListener("click", e => {
    const url = item.getAttribute("href");
    const listSpace = document.querySelector(".list-table");

    if(url.slice(url.lastIndexOf("/") + 1) == 3) return;

    boardTypeCode = url.slice(url.lastIndexOf("/") + 1);

    document.querySelector(".btn-write").classList.remove("hidden");

    document.querySelector(".btn-write").href = `${location.pathname.replace("board", "editBoard")}/${boardTypeCode}/insert`;

    e.preventDefault();

    fetch(url)
      .then(resp => resp.text())
      .then(html => {
        listSpace.innerHTML = html
      })
      .catch(error => {
        console.error("Error fetching data:", error);
    })

  })
})


pageNoList?.forEach((item, index) => {

  // 클릭 되었을 때
  item.addEventListener("click", e => {
    e.preventDefault();

    // 만약 클릭된 a태그에 "current" 클래스가 있을 경우
    // == 현재 페이지 숫자를 클릭한 경우
    if (item.classList.contains("current")) {
      return;
    }

    // const -> let으로 변경
    let pathname = location.pathname; // 현재 게시판 조회 요청 주소

    // 클릭된 버튼이 <<, <, >, >> 인 경우
    // console.log(item.innerText);
    switch (item.innerText) {
      case '<<':  // 1페이지로 이동
        pathname + "?cp=1";
        break;

      case '<':  // 이전 페이지
        pathname += "?cp=" + pagination.prevPage;
        break;

      case '>': // 다음 페이지
        pathname += "?cp=" + pagination.nextPage;
        break;

      case '>>': // 마지막 페이지
        pathname += "?cp=" + pagination.maxPage;
        break;

      default:  // 클릭한 숫자 페이지로 이동
        pathname += "?cp=" + item.innerText;
    }

    location.href = pathname;
  })
});