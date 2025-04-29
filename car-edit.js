document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('car-form');
    const params = new URLSearchParams(window.location.search);
    const carId = params.get('id');

    if (!carId) {
        alert('Hiba: Az autó azonosítója hiányzik.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const car = await fetchCarById(carId);
        populateForm(car);
    } catch (error) {
        alert(`Hiba történt az autó betöltésekor: ${error.message}`);
        window.location.href = 'index.html';
    }

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
        carData.id = carId;

        try {
            await updateCar(carData);
            alert('Autó sikeresen módosítva!');
            window.location.href = 'index.html';
        } catch (error) {
            alert(`Hiba történt: ${error.message}`);
        }
    });

    document.getElementById('cancel-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function populateForm(car) {
    document.getElementById('brand').value = car.brand;
    document.getElementById('model').value = car.model;
    document.getElementById('fuelUse').value = car.fuelUse;
    document.getElementById('owner').value = car.owner;
    document.getElementById('dayOfCommission').value = car.dayOfCommission;
    document.getElementById('electric').checked = car.electric;
}