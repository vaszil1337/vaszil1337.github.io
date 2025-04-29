function loadNavigation() {
    fetch('/nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('A navigáció betöltése sikertelen.');
            }
            return response.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
        })
        .catch(error => {
            console.error('Hiba a navigáció betöltésekor:', error.message);
        });
}

document.addEventListener('DOMContentLoaded', loadNavigation);