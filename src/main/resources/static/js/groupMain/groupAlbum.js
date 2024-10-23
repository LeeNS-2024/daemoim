/* document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 사진첩 데이터를 로드
    loadPhotos();

    // 더보기 버튼 클릭 시 페이지 전환
    document.getElementsByClassName("text-sm").addEventListener('click', function() {
        window.location.href = '/photo-gallery';  // 'photo-gallery' 페이지로 이동
    });

    // 사진첩 데이터를 서버에서 불러오는 함수
    function loadPhotos() {
        fetch('/photo/photobox')  // 사진첩 데이터를 가져오는 API 엔드포인트
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답에 문제가 발생했습니다.');
                }
                return response.json();  // 응답을 JSON으로 변환
            })
            .then(data => {
                const photoContainer = document.querySelector('.photo-box .grid');
                data.photos.forEach(photo => {
                    const imgElement = document.createElement('img');
                    imgElement.src = `/${photo.boardImgPath}/${photo.boardImgRename}`;
                    imgElement.alt = photo.boardImgOriginalName;
                    imgElement.classList.add('w-full', 'h-32', 'object-cover', 'rounded-lg');
                    photoContainer.appendChild(imgElement);  // 사진첩에 이미지 추가
                });

                // 사진첩의 제목도 업데이트
                const photoTitle = document.querySelector('.photo-box h2');
                photoTitle.innerHTML = `<span>${data.icon}</span> <span>${data.title}</span>`;
            })
            .catch(error => {
                console.error('사진첩을 불러오는 중 오류가 발생했습니다:', error);
            });
    }
});
 */
