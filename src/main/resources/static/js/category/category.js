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
        const query = searchInput.value || '';  
        const url = `/category/category?type=${selectedCategory}&query=${query}`;  

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("네트워크 응답에 문제가 있습니다.");
                }
                return response.text();
            })
            .then(html => {
                updateGroupList(html); 
            })
            .catch(err => console.error("에러 발생:", err));
    };

    const updateGroupList = (html) => {
        groupContainer.innerHTML = html;
    };

    fetchGroups();
});
