document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get('id');
    
    if (!carId) {
        alert('Nincs autó ID megadva!');
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const car = await fetchCarById(carId);
        renderCarDetails(car);
        
        document.getElementById('back-btn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        
        document.getElementById('edit-btn').addEventListener('click', () => {
            window.location.href = `car-edit.html?id=${carId}`;
        });
        
        document.getElementById('delete-btn').addEventListener('click', async () => {
            if (confirm('Biztosan törölni szeretné ezt az autót?')) {
                try {
                    await deleteCar(carId);
                    alert('Autó sikeresen törölve!');
                    window.location.href = 'index.html';
                } catch (error) {
                    alert('Hiba történt a törlés során: ' + error.message);
                }
            }
        });
    } catch (error) {
        alert('Hiba történt az autó adatainak betöltésekor: ' + error.message);
        window.location.href = 'index.html';
    }
});

function renderCarDetails(car) {
    const detailsContainer = document.getElementById('car-details');
    
    detailsContainer.innerHTML = `
        <h2>${car.brand} ${car.model}</h2>
        <div class="detail-group">
            <h3>Alapadatok</h3>
            <p><strong>Azonosító:</strong> ${car.id}</p>
            <p><strong>Tulajdonos:</strong> ${car.owner}</p>
            <p><strong>Gyártás dátuma:</strong> ${new Date(car.dayOfCommission).toLocaleDateString('hu-HU')}</p>
            <p><strong>Típus:</strong> ${car.electric ? 'Elektromos' : 'Hagyományos'}</p>
        </div>
        <div class="detail-group">
            <h3>Műszaki adatok</h3>
            <p><strong>Üzemanyagfogyasztás:</strong> ${car.fuelUse.toFixed(2)} l/100km</p>
        </div>
    `;
}