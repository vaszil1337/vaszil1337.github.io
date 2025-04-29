document.addEventListener('DOMContentLoaded', async () => {
    try {
        const cars = await fetchCars();
        renderCarList(cars);
        
    } catch (error) {
        alert('Hiba történt az autók betöltése közben.');
    }
});

function renderCarList(cars) {
    const carListContainer = document.getElementById('car-list');
    carListContainer.innerHTML = '';
    
    if (cars.length === 0) {
        carListContainer.innerHTML = '<p>Nincsenek autók a listában.</p>';
        return;
    }
    
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'card';
        carCard.innerHTML = `
            <h3>${car.brand} ${car.model}</h3>
            <p><strong>Tulajdonos:</strong> ${car.owner}</p>
            <p><strong>Üzemanyagfogyasztás:</strong> ${car.fuelUse.toFixed(2)} l/100km</p>            <p><strong>Gyártás éve:</strong> ${car.dayOfCommission}</p>
            <p><strong>Elektromos:</strong> ${car.electric ? 'Igen' : 'Nem'}</p>
            <div class="actions">
                <button class="btn btn-primary" data-id="${car.id}" data-action="view">Részletek</button>
                <button class="btn btn-secondary" data-id="${car.id}" data-action="edit">Szerkesztés</button>
                <button class="btn btn-danger" data-id="${car.id}" data-action="delete">Törlés</button>
            </div>
        `;
        
        carListContainer.appendChild(carCard);
    });
    
    document.querySelectorAll('[data-action="view"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            window.location.href = `car-details.html?id=${id}`;
        });
    });
    
    document.querySelectorAll('[data-action="edit"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            window.location.href = `car-edit.html?id=${id}`;
        });
    });
    
    document.querySelectorAll('[data-action="delete"]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (confirm('Biztosan törölni szeretné ezt az autót?')) {
                try {
                    await deleteCar(id);
                    alert('Autó sikeresen törölve!');
                    window.location.reload();
                } catch (error) {
                    alert('Hiba történt a törlés során: ' + error.message);
                }
            }
        });
    });
}