const apiKey = "9226ed0b9dd0791ba0039533eae0c888";
const searchForm = document.querySelector("form");
const locationInput = document.querySelector('input[name="location"]');
const todayWidget = document.querySelector("#today-widget");
const forecastWidget = document.querySelector("#forecast-widget");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = locationInput.value;
  try {
    // Get current weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log(data); // Print the data object to the console to see the structure of the response
    const temperature = data.main.temp.toFixed(0);
    const description = data.weather[0].description;

    // Get 7-day forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastResponse.json();
    console.log(forecastData); // Print the data object to the console to see the structure of the response

    displayWeather(location, temperature, description, forecastData.list);
  } catch (error) {
    console.error(error);
  }
});

function displayWeather(location, temperature, description, forecastList) {
  todayWidget.innerHTML = `
      <h2>${location}</h2>
      <p>Temperature: ${temperature} &deg;C</p>
      <p>Description: ${description}</p>
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

  // Display 7-day forecast data
  const forecastContainer = document.querySelector("#forecast-container");
  forecastContainer.innerHTML = "";

  for (const day in forecastsByDay) {
    const forecastDay = forecastsByDay[day];
    const dayOfWeek = new Date(forecastDay[0].dt * 1000).toLocaleString(
      "en-US",
      { weekday: "long" }
    );

    // Find highest and lowest temperature for the day
    let highestTemp = Number.MIN_SAFE_INTEGER.toFixed(0);
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

    const description = forecastDay[0].weather[0].description;
    const forecastDayHTML = `
        <div class="forecast-day">
          <h3>${dayOfWeek}</h3>
          <p>Highest temperature: ${highestTemp} &deg;C</p>
          <p>Lowest temperature: ${lowestTemp} &deg;C</p>
          <p>Description: ${description}</p>
        </div>
      `;
    forecastContainer.innerHTML += forecastDayHTML;
  }

  locationInput.value = ""; // Clear the input field
}
