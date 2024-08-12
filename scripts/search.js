document.addEventListener('DOMContentLoaded', () => {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const postsSection = document.getElementById('posts-section');
    const noResultsMessage = document.createElement('div'); // Komunikat o braku wyników

    // Ustaw domyślny widok na siatkę
    let currentView = 'grid-view';
    postsSection.classList.add(currentView);
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');

    gridViewBtn.addEventListener('click', () => {
        setView('grid-view');
    });

    listViewBtn.addEventListener('click', () => {
        setView('list-view');
    });

    // Obsługa wyszukiwania
    document.querySelector('.search-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Zatrzymaj standardowe działanie formularza
        const query = e.target.querySelector('input[type="text"]').value.toLowerCase();
        filterPosts(query);
    });

    function setView(view) {
        postsSection.classList.remove('grid-view', 'list-view');
        postsSection.classList.add(view);
        gridViewBtn.classList.toggle('active', view === 'grid-view');
        listViewBtn.classList.toggle('active', view === 'list-view');
        currentView = view; // Zapamiętaj aktualny widok
    }

    function filterPosts(query) {
        const posts = postsSection.querySelectorAll('.post');
        let hasResults = false;

        posts.forEach(post => {
            const title = post.querySelector('.text-content h2').innerText.toLowerCase();
            const content = post.querySelector('.text-content p').innerText.toLowerCase();
            if (title.includes(query) || content.includes(query)) {
                post.style.display = '';
                hasResults = true; // Znaleziono przynajmniej jeden wynik
            } else {
                post.style.display = 'none';
            }
        });

        if (!postsSection.querySelectorAll('.post').length) {
            // Jeśli sekcja postów jest pusta, dodaj komunikat o braku wyników
            noResultsMessage.textContent = 'Brak wyników wyszukiwania.';
            noResultsMessage.style.color = '#d9534f'; // Stylizowanie komunikatu
            noResultsMessage.style.textAlign = 'center';
            noResultsMessage.style.marginTop = '20px';
            postsSection.appendChild(noResultsMessage);
        } else if (!hasResults) {
            // Jeśli nie ma wyników wyszukiwania, ale są inne posty, wyświetl komunikat
            noResultsMessage.textContent = 'Brak wyników wyszukiwania.';
            if (!postsSection.contains(noResultsMessage)) {
                noResultsMessage.style.color = '#d9534f'; // Stylizowanie komunikatu
                noResultsMessage.style.textAlign = 'center';
                noResultsMessage.style.marginTop = '20px';
                postsSection.appendChild(noResultsMessage);
            }
        } else {
            // Jeśli są wyniki wyszukiwania, usuń komunikat
            if (postsSection.contains(noResultsMessage)) {
                postsSection.removeChild(noResultsMessage);
            }
        }

        setView(currentView); // Przywróć aktualny widok po wyszukaniu
    }
});
