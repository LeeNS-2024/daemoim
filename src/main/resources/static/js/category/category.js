document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');  
    const groupContainer = document.getElementById('groupContainer');   
    const searchInput = document.getElementById('searchQuery');        
    let selectedCategory = 'allCategory'; 

    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            selectedCategory = button.getAttribute('data-category'); 
            fetchGroups();  
        });
    });

    searchInput.addEventListener('input', () => {
        fetchGroups();
    });

    const fetchGroups = () => {
        const query = searchInput.value || '';  // 검색어가 없으면 빈 문자열로 설정
        const url = `/category?type=${selectedCategory}&query=${query}`;
        fetch(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'  // AJAX 요청임을 나타냄
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 오류 발생');
                }
                return response.text();
            })
            .then(html => {
                console.log(html);  // 응답 내용을 콘솔에 출력하여 확인
                console.log("Fetching URL:", url);
                updateGroupList(html);  // 모임 목록만 업데이트
            })
            .catch(error => {
                console.error('에러 발생:', error);
            });
    };
    
    const updateGroupList = (html) => {
        groupContainer.innerHTML = html;  // 받은 HTML로 모임 목록을 업데이트
    };

    // 페이지 로드 시 기본적으로 모든 모임 목록을 불러옴
    fetchGroups();
});


