const API_KEY = "98374256fb4b7a1bd17c4163753707c1";
const CITY_ID = "2673730"; // Stockholm
const DEFAULT_CITY = "Stockholm";

const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&appid=${API_KEY}&units=metric&cnt=40&lang=en`;

function updateChartData(cityId = CITY_ID, forecastData) {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "High Temperature (°C)",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Low Temperature (°C)",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Get default weather data for Stockholm
  async function getDefaultWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&appid=${API_KEY}&units=metric`
      );
      const {
        id,
        main: { temp },
        weather: [{ description }],
      } = await response.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${API_KEY}&units=metric&cnt=40&lang=en`
      );
      const forecastData = await forecastResponse.json();

      displayWeather(DEFAULT_CITY, temp.toFixed(0), description, forecastData.list);
      updateChartData(id, forecastData.list);
    } catch (error) {
      console.error(error);
    }
  }

  // Call the getDefaultWeather function
  getDefaultWeather();

  // Loop through the weather data and add the high and low temperature values to the chart data for the upcoming 5 days
  const today = new Date().getDate();
  let dayCount = 0;
  forecastData.forEach((item) => {
    const date = new Date(item.dt_txt);
    const day = date.getDate();
    if (day === today + dayCount) {
      chartData.labels.push(date.toDateString());
      console.log("High Temp:", item.main.temp_max);
      console.log("Low Temp:", item.main.temp_min);
      chartData.datasets[0].data.push(item.main.temp_max);
      chartData.datasets[1].data.push(item.main.temp_min);
      dayCount++;
      if (dayCount === 5) {
        return;
      }
    }
  });

  // Create the chart
  const ctx = document.getElementById("weather-chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

