import requests
import json

OPEN_WEATHER_MAP_API = "http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={9226ed0b9dd0791ba0039533eae0c888}"

OPEN_WEATHER_MAP_API_KEY = "9226ed0b9dd0791ba0039533eae0c888"

def get_weather_data(city):
    url = OPEN_WEATHER_MAP_API.format(city, OPEN_WEATHER_MAP_API_KEY)
    response = requests.get(url)
    data = json.loads(response.text)
    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]
    wind_speed = data["wind"]["speed"]
    description = data["weather"][0]["description"]
    return {
        "temperature": temperature,
        "humidity": humidity,
        "wind_speed": wind_speed,
        "description": description
    }

