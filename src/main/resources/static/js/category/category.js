document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.tab-link');  
    const categoryContents = document.querySelectorAll('.category-content');  
    let activeContent = document.querySelector('.category-content.active');
  
    const urlParams = new URLSearchParams(window.location.search);
    const categoryType = urlParams.get('type') || 'allCategory';  
  
    categoryContents.forEach(content => content.classList.remove('active', 'slide-in', 'slide-out'));
  
    const targetContent = document.getElementById(categoryType);
    if (targetContent) {
        targetContent.classList.add('active', 'slide-in');
        activeContent = targetContent;
    }
  
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();  
  
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
  
            if (targetContent && targetContent !== activeContent) {

                activeContent.classList.remove('slide-in');
                activeContent.classList.add('slide-out');
  
                setTimeout(() => {
                    activeContent.classList.remove('active', 'slide-out');
                    activeContent.style.visibility = 'hidden';
                    activeContent.style.opacity = '0';
                }, 500); 
  
                targetContent.classList.add('active', 'slide-in');
                targetContent.style.visibility = 'visible';
                targetContent.style.opacity = '1';
  
                activeContent = targetContent;
            }
  
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
