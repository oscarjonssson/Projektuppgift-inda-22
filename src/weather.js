// weather.js

const apiKey = `9226ed0b9dd0791ba0039533eae0c888`;

const searchForm = document.querySelector('form');
const locationInput = document.querySelector('input[name="location"]');
const todayWidget = document.querySelector('#today-widget');
const forecastWidget = document.querySelector('#forecast-widget');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value;
    getLocationData(location);
});

async function getLocationData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data); // Print the data object to the console to see the structure of the response
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        displayWeather(location, temperature, description);
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(location, temperature, description) {
    todayWidget.innerHTML = `
    <h2>${location}</h2>
    <p>Temperature: ${temperature} &deg;C</p>
    <p>Description: ${description}</p>
  `;
    locationInput.value = ''; // Clear the input field
}
