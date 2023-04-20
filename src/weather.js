window.onload = function() {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="location"]');
    const forecastElem = document.getElementById('today-widget');
    const forecastWidgetElem = document.getElementById('forecast-widget');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const city = input.value;
  
      // Get weather data for the city
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/weather?city=${city}`);
      xhr.send();
  
      xhr.onload = function() {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const temperature = response.temperature;
          const humidity = response.humidity;
          const windSpeed = response.wind_speed;
          const description = response.description;
          const forecast = response.forecast;
  
          // Update widget with weather data
          forecastElem.innerHTML = `
            <h2>${city}</h2>
            <p>Temperature: ${temperature} °C</p>
            <p>Humidity: ${humidity} %</p>
            <p>Wind speed: ${windSpeed} m/s</p>
            <p>Description: ${description}</p>
          `;
  
          // Update 7-day forecast
          let forecastHTML = '';
          for (let i = 0; i < forecast.length; i++) {
            const forecastItem = forecast[i];
            forecastHTML += `
              <div class="forecast-item">
                <h3>${forecastItem.date}</h3>
                <p>Temperature: ${forecastItem.temperature} °C</p>
                <p>Humidity: ${forecastItem.humidity} %</p>
                <p>Wind speed: ${forecastItem.wind_speed} m/s</p>
                <p>Description: ${forecastItem.description}</p>
              </div>
            `;
          }
          forecastWidgetElem.innerHTML = forecastHTML;
        } else {
          const errorElem = document.createElement('p');
          errorElem.innerText = 'Unable to get weather data. Please try again.';
          forecastElem.appendChild(errorElem);
        }
      }
    });
  }
  
  
