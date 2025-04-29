document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('car-form');

    document.getElementById('electric').addEventListener('change', (e) => {
        const fuelUseInput = document.getElementById('fuelUse');
        fuelUseInput.disabled = e.target.checked;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const carData = Object.fromEntries(formData.entries());

        if (carData.electric === 'on') {
            carData.fuelUse = 0;
        } else {
            carData.fuelUse = parseFloat(carData.fuelUse);
        }

        carData.electric = carData.electric === 'on';

        try {
            await createCar(carData);
            alert('Autó sikeresen hozzáadva!');
            window.location.href = 'index.html';
        } catch (error) {
            alert(`Hiba történt: ${error.message}`);
        }
    });

    document.getElementById('cancel-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});