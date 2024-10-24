document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.tab-link');
    const groupContainer = document.getElementById('groupContainer');
    const searchInput = document.getElementById('searchQuery');
    let selectedCategory = 'allCategory'; 

    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            selectedCategory = button.getAttribute('data-category'); 
            fetchGroups(); 
        });
    });

    // 검색 창에 입력된 내용을 기반으로 그룹 목록을 가져오는 함수
    function fetchGroups() {
        const query = searchInput.value || ''; // 검색어가 없으면 빈 문자열
        const url = `/category/category?type=${selectedCategory}&query=${query}`; 

        // 서버로 요청을 보냄
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답에 문제가 있습니다.');
                }
                return response.text(); 
            })
            .then(html => {
                updateGroupList(html); 
            })
            .catch(error => {
                console.error("에러: ", error);
            });
    }

    function updateGroupList(html) {
        groupContainer.innerHTML = html; 
    }
});
