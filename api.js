const API_BASE_URL = 'https://iit-playground.arondev.hu/api/xgbt95/car';

async function fetchCars() {
    const response = await fetch(API_BASE_URL);
    return await handleApiError(response);
}

async function fetchCarById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return await handleApiError(response);
}

async function createCar(carData) {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
    });

    return await handleApiError(response);
}

async function updateCar(carData) {
    const response = await fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
    });

    return await handleApiError(response);
}

async function deleteCar(carId) {
    const response = await fetch(`${API_BASE_URL}/${carId}`, {
        method: 'DELETE',
    });

    return await handleApiError(response);
}

function handleApiError(response) {
    if (!response.ok) {
        return response.json().then(errorData => {
            const errorMessage = errorData.message || 'Ismeretlen hiba történt.';
            throw new Error(errorMessage);
        });
    }
    return response.json();
}