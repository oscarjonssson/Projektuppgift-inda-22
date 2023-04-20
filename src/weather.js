const apiKey = "9226ed0b9dd0791ba0039533eae0c888";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const form = document.querySelector("form");
const input = document.querySelector("input[name=location]");
const weatherInfo = document.querySelector("#weather-info");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = input.value;
  const url = `${baseUrl}${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      const html = `
        <div class="weather-card">
          <img src="${iconUrl}" alt="${description}">
          <h2>${city}</h2>
          <p class="temperature">${temperature} &#8451;</p>
          <p>Humidity: ${humidity} %</p>
          <p>Wind speed: ${windSpeed} m/s</p>
          <p>Description: ${description}</p>
        </div>
      `;
      weatherInfo.innerHTML = html;
    })
    .catch((error) => console.log(error));
});

