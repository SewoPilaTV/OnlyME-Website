document.addEventListener('DOMContentLoaded', () => {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const postsSection = document.getElementById('posts-section');

    gridViewBtn.addEventListener('click', () => {
        postsSection.classList.add('grid-view');
        postsSection.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', () => {
        postsSection.classList.add('list-view');
        postsSection.classList.remove('grid-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
});
