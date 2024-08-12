// comments.js

import { database, ref, set, get, update, remove } from './firebase-config.js';

document.addEventListener("DOMContentLoaded", function () {
    const commentForm = document.getElementById("comment-form");
    const commentText = document.getElementById("comment-text");
    const commentAuthor = document.getElementById("comment-author");
    const commentsList = document.getElementById("comments-list");
    const errorMessage = document.getElementById("error-message");

    // Funkcja do generowania UUID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Funkcja do załadowania komentarzy z Firebase
    function loadComments() {
        const commentsRef = ref(database, 'comments');
        get(commentsRef).then((snapshot) => {
            if (snapshot.exists()) {
                const comments = snapshot.val();
                commentsList.innerHTML = Object.keys(comments).map((key) => {
                    const comment = comments[key];
                    return `<div class="comment" data-id="${key}">
                                <p class="comment-author">${comment.author}:</p>
                                <p class="comment-text">${comment.text}</p>
                                <p class="comment-date">${comment.date}</p>
                                <button class="like-comment" data-id="${key}">👍 Lubię to (${comment.likes || 0})</button>
                                ${comment.author === localStorage.getItem("currentUser") ? 
                                    `<button class="delete-comment" data-id="${key}">Usuń</button>` 
                                    : ''}
                            </div>`;
                }).join('');
            } else {
                commentsList.innerHTML = "<p>Brak dostępnych komentarzy.</p>";
            }
        }).catch((error) => {
            console.error("Błąd podczas pobierania komentarzy: ", error);
        });
    }

// Funkcja do dodania komentarza
commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Pobierz token reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();

    // Sprawdź, czy reCAPTCHA została rozwiązana
    if (!recaptchaResponse) {
        errorMessage.textContent = "Proszę rozwiązać CAPTCHA przed wysłaniem komentarza.";
        return;
    }

    const comment = commentText.value.trim();
    const author = commentAuthor.value.trim();

    if (comment && author) {
        errorMessage.textContent = ''; // Wyczyść ewentualne wcześniejsze komunikaty o błędach
        localStorage.setItem("currentUser", author); // Ustawiamy bieżącego użytkownika w LocalStorage

        const newComment = {
            text: comment,
            author: author,
            date: new Date().toLocaleString(),
            likes: 0
        };
        const newCommentRef = ref(database, 'comments/' + generateUUID());
        set(newCommentRef, newComment)
            .then(() => {
                commentText.value = '';
                commentAuthor.value = '';
                grecaptcha.reset(); // Zresetuj reCAPTCHA po wysłaniu formularza
                loadComments();
            })
            .catch((error) => {
                console.error("Błąd podczas dodawania komentarza: ", error);
            });
    } else {
        errorMessage.textContent = "Proszę wypełnić wszystkie pola.";
    }
});


    // Funkcja do usuwania komentarzy
    commentsList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-comment")) {
            const id = e.target.dataset.id;
            const commentsRef = ref(database, `comments/${id}`);
            remove(commentsRef)
                .then(() => {
                    loadComments();
                })
                .catch((error) => {
                    console.error("Błąd podczas usuwania komentarza: ", error);
                });
        }

        // Funkcja do polubienia komentarza
        if (e.target.classList.contains("like-comment")) {
            const id = e.target.dataset.id;
            const commentRef = ref(database, `comments/${id}`);

            get(commentRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const comment = snapshot.val();
                    update(commentRef, {
                        likes: (comment.likes || 0) + 1
                    }).catch((error) => {
                        console.error("Błąd podczas polubienia komentarza: ", error);
                    });
                }
            }).catch((error) => {
                console.error("Błąd podczas pobierania komentarza: ", error);
            });
        }
    });

    // Załaduj komentarze przy starcie
    loadComments();
});
