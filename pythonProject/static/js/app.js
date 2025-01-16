async function fetchCars() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/cars'); // Replace with deployed URL
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        displayCars(data.cars); // Call a function to render cars
    } catch (error) {
        console.error('Error fetching cars:', error);
    }
}

function displayCars(cars) {
    const carContainer = document.getElementById('car-list');
    carContainer.innerHTML = ''; // Clear existing content
    cars.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.classList.add('car');

        carDiv.innerHTML = `
            <h3>${car.make} ${car.model}</h3>
            <img src="${car.image}" alt="${car.name}">
            <p>${car.description}</p>
            <p>Price: $${car.price}</p>
            <p>Fuel Efficiency: ${car.fuel_efficiency} mpg</p>
        `;
        carContainer.appendChild(carDiv);
    });
}

// Call the function to fetch and display cars
fetchCars();
