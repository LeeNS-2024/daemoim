document.addEventListener('DOMContentLoaded', () => {
    const groupContainer = document.getElementById('groupContainer');   
    const searchInput = document.getElementById('searchQuery');        
    let selectedCategory = new URLSearchParams(window.location.search).get('type') || 'allCategory';

    searchInput.addEventListener('input', () => {
        getGroups();  
    });

    const getGroups = () => {
        const query = searchInput.value || '';  
        const url = `/category/groups?type=${selectedCategory}&query=${query}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',  
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('네트워크 오류 발생');
            return response.json();  
        })
        .then(data => {
            renderGroups(data);
        })
        .catch(error => {
            console.error('에러 발생:', error);
        });
    };

    const renderGroups = (groups) => {
        groupContainer.innerHTML = '';  

        groups.forEach(group => {
            const groupHTML = `
                <div class="category-box">
                    <div class="icon">
                        <img src="${group.groupMainImg ? group.groupMainImg : '/images/default.png'}" alt="${group.groupName} 아이콘" />
                    </div>
                    <div class="details">
                        <a href="/groupMain/${group.groupName}" class="categoryGroup-name" style="color: black; text-decoration: none;">
                            ${group.groupName}
                        </a>
                        <div class="group-name">${group.groupIntroduce}</div>
                        <div class="location">${group.categoryName}</div>
                        <div class="participants">
                            <i class="fa-solid fa-users"></i>
                            <div>${group.currentPopulation} / ${group.maxPopulation}</div>
                        </div>
                    </div>
                </div>
            `;
            groupContainer.insertAdjacentHTML('beforeend', groupHTML);
        });
    };

    getGroups();
});
