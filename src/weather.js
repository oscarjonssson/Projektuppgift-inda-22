let city = document.querySelector("#city");


check.addEventListener("click", () => {
    let apiKey = `9226ed0b9dd0791ba0039533eae0c888`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            weatherCity.innerText = `${data.name}, ${data.sys.country}`;
            temperature.innerHTML = `${data.main.temp}°C`;
        })
        .catch(error => console.log(error));

    city.value = "";
});

