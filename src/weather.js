const apiKey = "9226ed0b9dd0791ba0039533eae0c888";
const searchForm = document.querySelector("form");
const locationInput = document.querySelector('input[name="location"]');
const todayWidget = document.querySelector("#today-widget");
const forecastWidget = document.querySelector("#forecast-widget");

// Get default weather data for Stockholm
async function getDefaultWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=59.3293&lon=18.0686&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log(data);

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=59.3293&lon=18.0686&appid=${apiKey}&units=metric&cnt=40&lang=en`
    );
    const forecastData = await forecastResponse.json();
    console.log(forecastData);

    const temperature = data.main.temp.toFixed(0);
    const description = data.weather[0].description;

    displayWeather("Stockholm", temperature, description, forecastData.list);
  } catch (error) {
    console.error(error);
  }
}

// Call getDefaultWeather on page load
getDefaultWeather();

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let location =
    locationInput.value.charAt(0).toUpperCase() + locationInput.value.slice(1);
  if (!location) {
    // If location is empty, call getDefaultWeather
    getDefaultWeather();
  } else {
    try {
      // Get current weather data
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      console.log(data); // Print the data object to the console to see the structure of the response
      const temperature = data.main.temp.toFixed(0);
      const description = data.weather[0].description;

      // Get 5-day forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastResponse.json();
      console.log(forecastData); // Print the data object to the console to see the structure of the response

      displayWeather(location, temperature, description, forecastData.list);
    } catch (error) {
      console.error(error);
    }
  }
});

// Display weather data
function displayWeather(location, temperature, description, forecastList) {
  // Display today's weather card
  todayWidget.innerHTML = `
    <div class="card large">
      <h2>${location}</h2>
      <div class="card-content">
        <img src="https://openweathermap.org/img/w/${forecastList[0].weather[0].icon}.png" alt="${description}" />
        <p class="temperature">${temperature} &deg;C</p>
        <p class="description">${description}</p>
      </div>
    </div>
  `;

  // Group forecast data by day
  const forecastsByDay = {};
  for (let i = 0; i < forecastList.length; i++) {
    const forecast = forecastList[i];
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!forecastsByDay[day]) {
      forecastsByDay[day] = [];
    }
    forecastsByDay[day].push(forecast);
  }

  // Display 5-day forecast cards
  const forecastContainer = document.querySelector("#forecast-container");
  forecastContainer.innerHTML = "";
  let firstDay = true;
  for (const day in forecastsByDay) {
    if (firstDay) {
      firstDay = false;
      continue; // Skip first day (today's weather)
    }
    const forecastDay = forecastsByDay[day];
    const dayOfWeek = new Date(forecastDay[0].dt * 1000).toLocaleString(
      "en-US",
      { weekday: "long" }
    );

    // Find highest and lowest temperature for the day
    let highestTemp = Number.MIN_SAFE_INTEGER;
    let lowestTemp = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < forecastDay.length; i++) {
      const temp = forecastDay[i].main.temp;
      if (temp > highestTemp) {
        highestTemp = temp;
      }
      if (temp < lowestTemp) {
        lowestTemp = temp;
      }
    }

    // Create HTML for the forecast card
    const description = forecastDay[0].weather[0].description;
    const forecastDayHTML = `
      <div class="card">
        <h3>${dayOfWeek}</h3>
        <div class="card-content">
          <img src="https://openweathermap.org/img/w/${
            forecastDay[0].weather[0].icon
          }.png" alt="${description}" />
          <p class="temperature">High: ${Math.round(highestTemp)} &deg;C</p>
          <p class="temperature">Low: ${Math.round(lowestTemp)} &deg;C</p>
          <p class="description">${description}</p>
        </div>
      </div>
    `;
    forecastContainer.innerHTML += forecastDayHTML;
  }
}