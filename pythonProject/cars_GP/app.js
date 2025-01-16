// Define the API URL
const BASE_URL_CARS = "http://127.0.0.1:5000/api/cars/";

async function fetchCars() {
    try {
        const response = await fetch(BASE_URL_CARS);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayCars(data.items);
    } catch (error) {
        console.error("Error fetching car data:", error);
        document.getElementById("car-list").innerHTML = `<p>Error loading car data. Please try again later.</p>`;
    }
}


// Display the car data in the HTML
function displayCars(cars) {
  const carList = document.getElementById("car-list");
  carList.innerHTML = ""; // Clear any existing content

  cars.forEach(car => {
    const carDiv = document.createElement("div");
    carDiv.classList.add("car");

    carDiv.innerHTML = `
      <h3>${car.make} ${car.model}</h3>
      <p>Type: ${car.type}</p>
      <p>Year: ${car.year}</p>
      <p>Price: $${car.price}</p>
      <p>Passengers: ${car.passengers}</p>
    `;

    carList.appendChild(carDiv);
  });
}

// Fetch and display the cars when the page loads
fetchCars();
