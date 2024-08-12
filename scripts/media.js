document.addEventListener('DOMContentLoaded', function () {
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    const postsSection = document.querySelector('.posts');

    gridViewButton.addEventListener('click', function () {
        postsSection.classList.add('grid-view');
        postsSection.classList.remove('list-view');
        gridViewButton.classList.add('active');
        listViewButton.classList.remove('active');
    });

    listViewButton.addEventListener('click', function () {
        postsSection.classList.remove('grid-view');
        postsSection.classList.add('list-view');
        listViewButton.classList.add('active');
        gridViewButton.classList.remove('active');
    });
});
