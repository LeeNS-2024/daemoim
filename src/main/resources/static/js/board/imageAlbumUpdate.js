const form = document.getElementById('boardUpdateFrm');
const imageInput = document.getElementById('imageInput');
const imageList = document.getElementById('imageList');
const imageCount = document.getElementById('imageCount');
const addImageBtn = document.querySelector('.add-image-btn');
let imageArray = []; // 새로 추가할 이미지 저장 배열
const deleteOrderList = new Set(); // 삭제된 기존 이미지의 번호

const MAX_IMAGES = 20;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 파일 크기 제한 (10MB)

// 이미지 미리보기 생성 함수
function createPreviewElement(file, index, isExisting = false, imageNo = null) {
  const preview = document.createElement('div');
  preview.className = 'image-preview';
  if (isExisting) {
    preview.dataset.no = imageNo;
  } else {
    preview.dataset.index = index;
  }

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
      confirmM("사진을 삭제하시겠습니까?")
        .then(result => {
          if(!result) return;
          deletedImages.add(imageNo);
          wrapper.remove();
          updateImageCount();
        });
    });
  }
  )
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
    confirmM("추가한 사진을 삭제하시겠습니까?")
    .then(result => {
      if(!result) return;
      currentImages.delete(file);
      preview.remove();
      updateImageCount();
    });
  });

  return preview;
}

// 호버 시 미리보기 설정
function setupHoverPreview() {
  const previewWrappers = document.querySelectorAll('.preview-wrapper');
  const fileName = document.createElement('div');
  fileName.className = 'file-name';
  fileName.textContent = isExisting ? file.alt : file.name;

  if (isExisting) {
    img.src = file.src;
    img.alt = file.alt;
  } else {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  previewWrapper.appendChild(img);
  previewWrapper.appendChild(deleteBtn);
  previewWrapper.appendChild(fileName);
  preview.appendChild(previewWrapper);

  return preview;
}

// 이미지 제거 함수
function removeImage(indexToRemove) {
  imageArray = imageArray.filter((_, index) => index !== indexToRemove);
  refreshImageDisplay();
}

// 이미지 디스플레이 새로고침
function refreshImageDisplay() {
  // 새로 추가된 이미지 프리뷰만 제거
  const newPreviews = imageList.querySelectorAll('.image-preview:not([data-no])');
  newPreviews.forEach(preview => preview.remove());

  // 이미지 재렌더링
  imageArray.forEach((file, index) => {
    const preview = createPreviewElement(file, index);
    imageList.insertBefore(preview, addImageBtn);
  });
}

// 이미지 개수 업데이트
function updateImageCount() {
  const existingImagesCount = imageList.querySelectorAll('.image-preview[data-no]').length;
  const totalCount = existingImagesCount + imageArray.length;
  imageCount.textContent = totalCount;
  addImageBtn.style.display = totalCount >= MAX_IMAGES ? 'none' : 'flex';
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

// 파일 입력 처리
function handleFileSelect(e) {
  const files = Array.from(e.target.files);
  const existingImagesCount = imageList.querySelectorAll('.image-preview[data-no]').length;
  const remainingSlots = MAX_IMAGES - (existingImagesCount + imageArray.length);

  if (files.length > remainingSlots) {
    alert(`이미지는 최대 ${MAX_IMAGES}장까지만 업로드 가능합니다.`);
    files.length = remainingSlots;
  }

  const validFiles = files.filter(validateFile);
  if (validFiles.length > 0) {
    imageArray = [...imageArray, ...validFiles];
    refreshImageDisplay();
    updateImageCount();
  }

  // 입력 초기화
  e.target.value = '';
}

// 폼 제출 처리
function handleSubmit(e) {
  e.preventDefault();

  const title = form.querySelector('[name="boardTitle"]').value.trim();

  if (title.length === 0) {
    alert('제목을 작성해주세요.');
    form.querySelector('[name="boardTitle"]').focus();
    return;
  }

  const totalImageCount = imageList.querySelectorAll('.image-preview[data-no]').length + imageArray.length;
  if (totalImageCount === 0) {
    alert('최소 1장 이상의 사진이 필요합니다.');
    return;
  }

  const formData = new FormData(form);
  
  // 삭제된 이미지 번호 추가
  deleteOrderList.forEach(imageNo => {
    formData.append('deleteList', imageNo);
  });

  // 기존 이미지 필드 제거 (중복 방지)
  formData.delete('images');
  // 새로운 이미지 파일들을 추가
  imageArray.forEach(file => {
    formData.append('images', file);
  });

  fetch(form.action, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if(response.ok) return response.text();
      throw new Error("게시글 수정 중 오류가 발생했습니다.");
    })
    .then(result => {
      if (result !== null) {
        location.href = result;
      } else {
        alert(data.message || '게시글 수정에 실패했습니다.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error.message);
    });
}

// 취소 버튼 처리
document.getElementById('cancelBtn').addEventListener('click', () => {
  confirmM("수정을 취소하시겠습니까?\n변경사항이 저장되지 않습니다.")
  .then(result => {
    if(!result) return;
    history.back();
  })

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
  // 기존 이미지 초기화
  const existingImages = imageList.querySelectorAll('.image-preview[data-no]');
  existingImages.forEach(preview => {
    const img = preview.querySelector('.preview');
    createPreviewElement(img, null, true, preview.dataset.no);
  });
  
  updateImageCount();
  imageInput.addEventListener('change', handleFileSelect);
  form.addEventListener('submit', handleSubmit);
  document.getElementById('cancelBtn').addEventListener('click', handleCancel);
});