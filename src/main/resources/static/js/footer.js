const chatSection = document.querySelector(".chat-boxSec");
const chatBoxGroupName = document.querySelector(".chat-topBody");
const chatBoxNickname = document.querySelector(".chat-nickDiv");
const chatBoxContents = document.querySelector(".chat-contentDiv");
const chatBtnOff = document.querySelector(".chat-offBtn");
const chatBtnOn = document.querySelector(".chat-onBtn");

let openChatRoom = null;

/* ******************************************************** */
/* 채팅창 크기변경 */


const chatBody = document.querySelector(".chat-body");
const chatUls = document.querySelectorAll(".chat-body ul");
const resizer = document.createElement("div");
resizer.classList.add("resizer");
chatBody.appendChild(resizer);
console.log("리사이저추가완료")

resizer.addEventListener("mousedown", (e) => {
  e.preventDefault();
  
  window.addEventListener("mousemove", resize);
  window.addEventListener("mouseup", stopResize);

});

function resize(e) {
  chatBody.style.width = chatBody.offsetWidth - (e.movementX) + "px";
  chatBody.style.height = chatBody.offsetHeight - (e.movementY) + "px";
  chatUls[0].style.height = (chatBody.offsetHeight - 122) + 'px';
  chatUls[1].style.height = (chatBody.offsetHeight - 122) + 'px';
}

function stopResize() {
  window.removeEventListener("mousemove", resize);
  window.removeEventListener("mouseup", stopResize);
}





/* ******************************************************** */
/* 채팅창 열기 기능 */

// [] : 함수

// 클릭시 비동기로 [채팅창정보(loginMemberNo)] .가입목록 얻어와 표시, map에 [그룹번호, [접속회원들] 만들어야함]
// .마지막 읽은 날자를 조회하여 모임별 새 메세지 갯수 표시
// 마지막 읽은 날자가 없으면 전체 채팅갯수 표시
// .마지막으로 접속했던 [채팅방 열기(groupNo)]
// 채팅방 별 접속한 [websocket회원 닉네임 표시(groupNo)]
// 채팅창 open

// 필요한것
// [채팅창열기(loginMemberNo)]
// [채팅방 열기(groupNo)]
// [websocket회원 닉네임 표시(groupNo)]


// ajax

// DTO 1 - 필요없음, map에 담아오세요 ㅡㅡ
// 로그인회원번호
// 모임 List - 회원 수 내림차순, resultMap이용
//   모임번호
//   모임이름
//   메시지 카운트
// 마지막 읽은 날자
// 마지막 읽은 모임번호 lastReaded

// DTO2
// 모임번호
// 모임이름
// 메시지 카운트 unreadCount

// DTO3
// 채팅 테이블 DTO
// chatNo
// chatContent
// chatWriteDate
// chatCount
// memberNo
// groupNo
// memberNickname
// memberProfileUrl

// websoket
// 접속한 회원 닉네임 List - 닉네임오름차순
// 채팅

// 가입목록과, 마지막읽은 모임번호를 가져오는 함수
const chatInfo = (memberNo) => {

  console.log("챗.chatInfo 실행됨, params.memberNo : " + memberNo);

  fetch("/chat/getChatInfo?memberNo=" + memberNo)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("")
  })
  .then(map => {

    const groupList = map.groupList;
    console.log("챗.chatInfo.groupList : " + groupList);

    chatBoxGroupName.innerHTML = '';
    groupList.forEach(group => {
      const div = document.createElement("div");
      if(group.unreadCount == 0){
        div.innerText = group.groupName;
      } else {
        const span = document.createElement("span");
        span.innerText = group.unreadCount;
        span.classList.add("chat-unReaded");
        span.classList.add(group.groupNo);
        div.innerText = group.groupName;
        div.append(span);
      }
      div.dataset.groupNo = group.groupNo;
      div.classList.add("chat-groupName");
      div.addEventListener("click", ()=>{openChat(group.groupNo);});
      chatBoxGroupName.append(div);
    });

    console.log("챗.chatInfo : openChat() 실행, params.groupNo : " + map.lastReaded);
    openChat(map.lastReaded);

    // 채팅목록 가져오는동안 창 열기
    chatSection.classList.remove("display-none");
    chatBody.classList.remove("display-none");
    chatBtnOn.classList.add("display-none");
    chatBtnOff.classList.remove("display-none");


  })
  .catch(err => {
    console.log("챗.chatInfo 애러, params.memberNo : " + memberNo);
    console.error(err);
  });

}; // chatInfo end


// 로그인 목록, 채팅컨탠츠 가져오는 함수
const openChat = (groupNo) => {

  console.log("챗.openChat 실행됨, params.groupNo : " + groupNo);

  if(groupNo < 1){
    chatBoxContents.innerText = '채팅방을 선택해 주세요';
    return;
  }

  /* websocket으로 회원닉네임리스트 호출 */
  const obj = {
    "loginMemberNo" : chatLoginMemberNo,
    "groupNo" : groupNo
  };
  memsocket.send( JSON.stringify(obj) );

  // 채팅 컨탠츠 가져오기
  fetch("/chat/getContent?groupNo=" + groupNo)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("")
  })
  .then(chatList => {

    if(chatList === null){
      chatUls[1].innerHTML = '채팅내역이 없습니다';
      return;
    }

    console.log("챗.openChat.chatList : " + chatList);
    
    chatUls[1].innerHTML = '';
    chatList.forEach(chat => {
      console.log("챗.openChat.chat : " + chat);
      if(chatLoginMemberNo !== chat.memberNo) contentOthers(chat);
      else contentSelf(chat);
    });

    updateReadDate(groupNo); // 마지막 접속일 업데이트
    openChatRoom = groupNo; // 현재 열려있는 채팅창번호 저장
    chatUls[1].style.height = (chatBody.offsetHeight - 122) + 'px';
    chatUls[1].scrollTop = chatUls[1].scrollHeight; // 스크롤 제일 밑으로

  })
  .catch(err => {
    console.log("챗.openChat 애러, params.groupNo : " + groupNo);
    console.error(err);
  });

};

// 상대방 채팅 만들기
const contentOthers = (chat) => {
  const li = document.createElement("li");
    li.classList.add("chat-contentOthers");
    const div1 = document.createElement("div");
      div1.classList.add("chat-memberNinkname");
      const img = document.createElement("img");
      if(chat.memberProfileUrl !== null){
        img.src = chat.memberProfileUrl;
        img.alt = "profile";
        img.width = "14px";
        img.height = "14px";
        div1.innerHTML = img + chat.memberNickname;
      } else {
        div1.innerHTML = chat.memberNickname;
      }
    const div2 = document.createElement("div");
      const div21 = document.createElement("div");
        div21.classList.add("chat-contents")
        div21.innerText = (chat.chatContent);
      const div22 = document.createElement("div");
        div22.classList.add("chat-comments");
        const div221 = document.createElement("div");
          div221.classList.add("chat-date");
          div221.innerText = chat.chatWriteDate;
        const div222 = document.createElement("div");
          div222.classList.add("chat-unReaded");
          div222.innerText = chat.chatCount;
      div22.append(div221, div222);
    div2.append(div21, div22);
  li.append(div1, div2);
  chatUls[1].appendChild(li);
};
// 내가쓴 채팅 만들기
const contentSelf = (chat) => {
  const li = document.createElement("li");
    li.classList.add("chat-contentSelf");
    const div1 = document.createElement("div");
      div1.classList.add("chat-comments");
      const div11 = document.createElement("div");
      div11.classList.add("chat-date");
      div11.innerText = chat.chatWriteDate;
      const div12 = document.createElement("div");
      div12.classList.add("chat-unReaded");
      div12.innerText = chat.chatCount;
    div1.append(div11, div12);
    const div2 = document.createElement("div");
      div2.classList.add("chat-contents");
      div2.innerText = (chat.chatContent);
  li.append(div1, div2);
  chatUls[1].appendChild(li);
};


// 채팅 아이콘클릭시 위 함수 시행
chatBtnOn?.addEventListener("click", ()=>{
  chatInfo(chatLoginMemberNo);
  addCloseChat();
});

// 마지막 접속일 업데이트
const updateReadDate = (groupNo) => {
  fetch("/chat/updateReadDate?groupNo=" + groupNo + "&memberNo=" + chatLoginMemberNo)
  .then(response => {
    if(!response.ok) throw new Error(response.status)
    return;
  })
  .catch(err => {
    console.log("챗.updateReadDate 애러, params.groupNo : " + groupNo);
    console.error(err);
  });
};



/* ******************************************************** */
/* 채팅창 닫기 기능 */


const addCloseChat = () => {
  chatSection.addEventListener("click", (e) => {
    // 채팅창 닫기
    chatSection.classList.add("display-none");
    chatBody.classList.add("display-none");
    chatBtnOff.classList.add("display-none");
    chatBtnOn.classList.remove("display-none");
  });
};


/* ******************************************************** */
/* 채팅메시지 입력시 */


const chatForm = document.querySelector("#chat-form");
const chatTextarea = document.getElementById("chat-textarea");

// 메시지 보내는 함수
const sendChat = ()=>{
  console.log("챗. sendChat() 실행");
  
  if(chatLoginCheck === false) return;// 비로그인 반환
  if(openChatRoom === null) return; // 채팅창 안열었을때 반환
  const msg = chatTextarea.value;
  console.log("챗. sendChat() msg : 0" + msg);
  if(msg.trim().length === 0) return; // 입력한 메세지 없으면 반환

  const obj = {
    "memberNo" : chatLoginMemberNo,
    "chatContent" : msg,
    "groupNo" : openChatRoom
  };

  chatsocket.send( JSON.stringify(obj) );

  chatTextarea.value = '';
  updateReadDate(openChatRoom); // 마지막 접속일 업데이트

};

// 텍스트 에어리어에서 엔터 확인시(시프트엔터 x)
chatTextarea?.addEventListener("keyup", e => {
  // 입력한 키가 Enter인 경우
  if(e.key == "Enter"){
    if(!e.shiftKey){ /// shift가 눌러지지 않은 경우
      // == shift + enter 입력 시 제출 X
      sendChat();
    }
  }
});

// 폼태그가 전송될때(버튼누를때)
chatForm?.addEventListener("submit", e => {
  e.preventDefault();
  sendChat();
});



/* ******************************************************** */
/* websocket설정 */


let chatsocket;
let memsocket;

if(chatLoginCheck){
  console.log("챗. chatsocket 생성요청");
  chatsocket = new SockJS("/chatsocket");
  console.log("챗. memsocket 생성요청");
  memsocket = new SockJS("/memsocket");
}

if(chatsocket != null){
  
  chatsocket.addEventListener("message", e => {
    console.log("챗. 메시지받음 : " + e.data);
    
    const chat = JSON.parse(e.data);
    console.log("챗. 메시지변환 : " + chat);

    // 채팅메시지일때
    
    // 채팅창 닫혀있을때
    if(chatBoxGroupName.classList.contains("display-none")){
      document.querySelector(".chat-onBtn>.chat-unReaded").innerText
      = Number(document.querySelector(".chat-onBtn>.chat-unReaded").innerText) + 1;
      return;
    }
    // 채팅 창은 열려있는데 방이 다른방일때
    if(chat.groupNo !== openChatRoom){
      // 그룹 버튼 중 해당그룹 선택
      document.querySelector(".chat-topBody>.chat-groupName>." +chat.groupNo ).innerText
      = Number(document.querySelector(".chat-topBody>.chat-groupName>." +chat.groupNo ).innerText) + 1;
      return;
    }

    // 채팅창 열려있을때
    if(chatLoginMemberNo !== chat.memberNo) contentOthers(chat);
    else contentSelf(chat);

    chatUls[1].style.height = (chatBody.offsetHeight - 122) + 'px';
    chatUls[1].scrollTop = chatUls[1].scrollHeight; // 스크롤 제일 밑으로
    updateReadDate(openChatRoom); // 마지막 접속일 업데이트

  });

}

if(memsocket != null){
  
  memsocket.addEventListener("message", e => {
    console.log("챗. 데이터목록받음 : " + e.data);
    
    const memberNickList = JSON.parse(e.data);
    console.log("챗. 데이터목록변환 : " + memberNickList);

    // 로그인중인 멤버목록을 받아오면
    chatUls[0].innerHTML = '';
    memberNickList.forEach(chat => {
      const li = document.createElement("li");
      li.innerText = chat.memberNickname;
      chatUls[0].append(li);
    });

  });

}

/* ******************************************************** */
/* 페이지 로딩시 */


document.addEventListener("DOMContentLoaded", ()=>{
  console.log("로딩 완료 후 메서드 시작함")

  if(chatLoginCheck){
    console.log("로그인이 확인되어 채팅아이콘 띄움")
    chatBtnOn.classList.remove("display-none");
  }
});