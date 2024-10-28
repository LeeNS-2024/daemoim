// 전역 변수 선언
const MAX_IMAGES = 20;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// DOM 요소
const form = document.getElementById('boardUpdateFrm');
const imageInput = document.getElementById('imageInput');
const imageList = document.getElementById('imageList');
const imageCount = document.getElementById('imageCount');
const addImageBtn = document.querySelector('.add-image-btn');

// 이미지 관리를 위한 Set
const currentImages = new Set(); // 새로 추가된 이미지
const deletedImages = new Set(); // 삭제된 기존 이미지의 번호

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  initializeExistingImages();
  updateImageCount();
  setupHoverPreview();
});

// 기존 이미지 초기화
function initializeExistingImages() {
  const existingImages = document.querySelectorAll('.existing-image');

  existingImages.forEach(wrapper => {
    // 삭제 버튼 이벤트 추가
    const deleteBtn = wrapper.querySelector('.delete-image');
    const imageNo = wrapper.querySelector('input[name="existingImages"]').value;

    deleteBtn.addEventListener('click', () => {
      if (confirm('이미지를 삭제하시겠습니까?')) {
        deletedImages.add(imageNo);
        wrapper.remove();
        updateImageCount();
      }
    });
  });
}

// 이미지 미리보기 생성
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

  // 삭제 버튼 이벤트
  deleteBtn.addEventListener('click', () => {
    if (confirm('추가한 이미지를 삭제하시겠습니까?')) {
      currentImages.delete(file);
      preview.remove();
      updateImageCount();
    }
  });

  return preview;
}

// 호버 시 미리보기 설정
function setupHoverPreview() {
  const previewWrappers = document.querySelectorAll('.preview-wrapper');

  previewWrappers.forEach(wrapper => {
    wrapper.addEventListener('mouseover', (e) => {
      const img = wrapper.querySelector('.preview');

      const popup = document.createElement('div');
      popup.className = 'preview-popup';
      const popupImg = new Image();
      popupImg.src = img.src;
      popup.appendChild(popupImg);

      popup.style.left = e.pageX + 10 + 'px';
      popup.style.top = e.pageY + 10 + 'px';

      document.body.appendChild(popup);

      wrapper.addEventListener('mousemove', movePopup);
      wrapper.addEventListener('mouseout', removePopup);

      function movePopup(e) {
        popup.style.left = e.pageX + 10 + 'px';
        popup.style.top = e.pageY + 10 + 'px';
      }

      function removePopup() {
        popup.remove();
        wrapper.removeEventListener('mousemove', movePopup);
        wrapper.removeEventListener('mouseout', removePopup);
      }
    });
  });
}

// 총 이미지 개수 계산
function getTotalImageCount() {
  const existingImagesCount = document.querySelectorAll('.existing-image').length;
  return existingImagesCount + currentImages.size;
}

// 이미지 개수 업데이트 및 버튼 표시 상태 관리
function updateImageCount() {
  const totalCount = getTotalImageCount();
  imageCount.textContent = totalCount;

  if (totalCount >= MAX_IMAGES) {
    addImageBtn.style.display = 'none';
  } else {
    addImageBtn.style.display = 'flex';
  }
}

// 파일 유효성 검사
function validateFile(file) {
  if (file.size > MAX_FILE_SIZE) {
    alert(`${file.name}의 크기가 10MB를 초과합니다.`);
    return false;
  }

  if (!file.type.startsWith('image/')) {
    alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
    return false;
  }

  return true;
}

// 이미지 입력 처리
imageInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);

  for (const file of files) {
    if (getTotalImageCount() >= MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지만 업로드 가능합니다.`);
      break;
    }

    if (!validateFile(file)) continue;

    currentImages.add(file);
    const preview = createPreviewElement(file);
    imageList.insertBefore(preview, addImageBtn);
  }

  updateImageCount();
  imageInput.value = '';
});

// 폼 제출 처리
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.querySelector('[name="boardTitle"]').value.trim();

  // 유효성 검사
  if (title.length === 0) {
    alert('제목을 작성해주세요.');
    form.querySelector('[name="boardTitle"]').focus();
    return;
  }

  if (getTotalImageCount() === 0) {
    alert('최소 1장 이상의 사진이 필요합니다.');
    return;
  }

  try {
    // FormData 생성
    const formData = new FormData(form);

    // 삭제된 이미지 번호 추가
    deletedImages.forEach(imageNo => {
      formData.append('deleteList', imageNo);
    });

    // 새로 추가된 이미지 파일 추가
    currentImages.forEach(file => {
      formData.append('images', file);
    });

    // 서버로 전송
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      alert('게시글이 성공적으로 수정되었습니다.');
      location.href = data.redirectUrl;
    } else {
      alert(data.message || '게시글 수정에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('게시글 수정 중 오류가 발생했습니다.');
  }
});

// 취소 버튼 처리
document.getElementById('cancelBtn').addEventListener('click', () => {
  if (confirm('수정을 취소하시겠습니까?\n변경사항이 저장되지 않습니다.')) {
    history.back();
  }
});