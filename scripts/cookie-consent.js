document.addEventListener('DOMContentLoaded', () => {
    const consentBanner = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');

    // Sprawdź, czy użytkownik już zaakceptował lub odrzucił cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    // Jeśli zgoda na cookies nie została udzielona, pokaż powiadomienie
    if (cookiesAccepted === null) {
        consentBanner.style.display = 'flex';
    } else {
        consentBanner.style.display = 'none';
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        consentBanner.style.display = 'none';
    });

    declineButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'false');
        consentBanner.style.display = 'none';
    });
});
