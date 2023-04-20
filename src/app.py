from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

OPEN_WEATHER_MAP_API = "https://api.openweathermap.org/data/2.5/weather?q={}&appid={}&units=metric"
OPEN_WEATHER_MAP_API_KEY = "9226ed0b9dd0791ba0039533eae0c888"

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        city = request.form['location']
    else:
        city = "Stockholm"

    url = OPEN_WEATHER_MAP_API.format(city, OPEN_WEATHER_MAP_API_KEY)
    response = requests.get(url)
    data = json.loads(response.text)

    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]
    wind_speed = data["wind"]["speed"]
    description = data["weather"][0]["description"]

    # Get 7-day forecast data
    forecast_url = "https://api.openweathermap.org/data/2.5/forecast?q={}&appid={}&units=metric".format(city, OPEN_WEATHER_MAP_API_KEY)
    forecast_response = requests.get(forecast_url)
    forecast_data = json.loads(forecast_response.text)

    # Create a list of dictionaries with each dictionary containing the date and temperature for each day
    forecast_list = []
    for i in range(0, len(forecast_data["list"]), 8):
        date = forecast_data["list"][i]["dt_txt"].split()[0]
        temp = forecast_data["list"][i]["main"]["temp"]
        humidity = forecast_data["list"][i]["main"]["humidity"]
        wind_speed = forecast_data["list"][i]["wind"]["speed"]
        description = forecast_data["list"][i]["weather"][0]["description"]
        forecast_list.append({"date": date, "temperature": temp, "humidity": humidity, "wind_speed": wind_speed, "description": description})

    return render_template('weather.html', temperature=temperature, humidity=humidity, wind_speed=wind_speed, description=description, forecast_list=forecast_list)

if __name__ == '__main__':
    app.run()

