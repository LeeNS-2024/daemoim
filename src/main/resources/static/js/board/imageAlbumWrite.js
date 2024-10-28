// 전역 변수 선언
const MAX_IMAGES = 20;
const form = document.getElementById('boardWriteFrm');
const imageInput = document.getElementById('imageInput');
const imageList = document.getElementById('imageList');
const imageCount = document.getElementById('imageCount');
const addImageBtn = document.querySelector('.add-image-btn');
let currentImages = new Set();

// 파일 크기 제한 (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// 이미지 미리보기 생성 함수
function createPreviewElement(file) {
  const template = document.querySelector('.image-preview-template');
  const preview = template.cloneNode(true);
  preview.style.display = 'block';
  preview.classList.remove('image-preview-template');

  const img = preview.querySelector('.preview');
  const fileName = preview.querySelector('.file-name');
  const deleteBtn = preview.querySelector('.delete-image');

  // 이미지 미리보기 설정
  const reader = new FileReader();
  reader.onload = (e) => {
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);

  // 파일명 표시
  fileName.textContent = file.name;

  // 호버 시 큰 미리보기 기능
  preview.addEventListener('mouseover', (e) => {
    const popup = document.createElement('div');
    popup.className = 'preview-popup';
    const popupImg = new Image();
    popupImg.src = img.src;
    popup.appendChild(popupImg);

    // 마우스 위치에 따라 팝업 위치 조정
    popup.style.left = e.pageX + 10 + 'px';
    popup.style.top = e.pageY + 10 + 'px';

    document.body.appendChild(popup);

    preview.addEventListener('mousemove', (e) => {
      popup.style.left = e.pageX + 10 + 'px';
      popup.style.top = e.pageY + 10 + 'px';
    });

    preview.addEventListener('mouseout', () => {
      popup.remove();
    });
  });

  // 삭제 버튼 이벤트
  deleteBtn.addEventListener('click', () => {
    currentImages.delete(file);
    preview.remove();
    updateImageCount();

    // 이미지가 모두 삭제되면 추가 버튼 표시
    if (currentImages.size === 0) {
      addImageBtn.style.display = 'flex';
    }
  });

  return preview;
}

// 이미지 개수 업데이트
function updateImageCount() {
  imageCount.textContent = currentImages.size;

  // 최대 개수에 도달하면 추가 버튼 숨기기
  if (currentImages.size >= MAX_IMAGES) {
    addImageBtn.style.display = 'none';
  } else {
    addImageBtn.style.display = 'flex';
  }
}

// 파일 입력 처리
imageInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);

  // 파일 유효성 검사
  for (const file of files) {
    // 최대 개수 체크
    if (currentImages.size >= MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지만 업로드 가능합니다.`);
      break;
    }

    // 파일 크기 체크
    if (file.size > MAX_FILE_SIZE) {
      alert(`${file.name}의 크기가 10MB를 초과합니다.`);
      continue;
    }

    // 파일 형식 체크
    if (!file.type.startsWith('image/')) {
      alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
      continue;
    }

    currentImages.add(file);
    const preview = createPreviewElement(file);
    imageList.insertBefore(preview, addImageBtn);
  }

  updateImageCount();
  imageInput.value = ''; // 입력 초기화
});

/* // 폼 제출 처리
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.querySelector('[name="boardTitle"]').value.trim();

  // 제목 검사
  if (title.length === 0) {
    alert('제목을 작성해주세요.');
    form.querySelector('[name="boardTitle"]').focus();
    return;
  }

  // 이미지 검사
  if (currentImages.size === 0) {
    alert('사진을 등록해주세요.');
    return;
  }

  // FormData 생성 및 전송
  const formData = new FormData(form);
  currentImages.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    // 응답 내용 확인을 위한 로깅
    const responseText = await response.text();
    console.log('서버 응답:', responseText);
    console.log('응답 헤더:', response.headers);

    // 응답이 JSON인지 확인
    try {
      const data = JSON.parse(responseText);
      if (data.success) {
        location.href = data.redirectUrl;
      } else {
        alert(data.message || '게시글 등록에 실패했습니다.');
      }
    } catch (jsonError) {
      console.error('JSON 파싱 에러:', jsonError);
      alert('서버 응답을 처리하는 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    alert('게시글 등록 중 오류가 발생했습니다.');
  }
}); */

/* // 폼 제출 처리
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.querySelector('[name="boardTitle"]').value.trim();

  // 제목 검사
  if (title.length === 0) {
    alert('제목을 작성해주세요.');
    form.querySelector('[name="boardTitle"]').focus();
    return;
  }

  // 이미지 검사
  if (currentImages.size === 0) {
    alert('사진을 등록해주세요.');
    return;
  }

  // FormData 생성 및 전송
  const formData = new FormData(form);
  currentImages.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    // 응답이 JSON이 아닐 경우를 대비한 에러 처리
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      throw new Error('서버에서 JSON 응답이 오지 않았습니다.');
    }

    if (data.success) {
      location.href = data.redirectUrl;
    } else {
      alert(data.message || '게시글 등록에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('게시글 등록 중 오류가 발생했습니다.');
  }
}); */

// 폼 제출 처리
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = form.querySelector('[name="boardTitle"]').value.trim();
    
    // 제목 검사
    if (title.length === 0) {
        alert('제목을 작성해주세요.');
        form.querySelector('[name="boardTitle"]').focus();
        return;
    }
    
    // 이미지 검사
    if (currentImages.size === 0) {
        alert('사진을 등록해주세요.');
        return;
    }
    
    // FormData 생성 및 전송
    const formData = new FormData(form);
    currentImages.forEach(file => {
        formData.append('images', file);
    });
    
    // 서버로 전송
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.href = data.redirectUrl;
        } else {
            alert(data.message || '게시글 등록에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('게시글 등록 중 오류가 발생했습니다.');
    });
});

// 취소 버튼 처리
document.getElementById('cancelBtn').addEventListener('click', () => {
  if (confirm('작성을 취소하시겠습니까?')) {
    history.back();
  }
});