import requests
import json

OPEN_WEATHER_MAP_API = "https://api.openweathermap.org/data/2.5/weather?q={}&appid={}&units=metric"
OPEN_WEATHER_MAP_API_KEY = "9226ed0b9dd0791ba0039533eae0c888"

city = "Stockholm"

url = OPEN_WEATHER_MAP_API.format(city, OPEN_WEATHER_MAP_API_KEY)

response = requests.get(url)
data = json.loads(response.text)

temperature = data["main"]["temp"]
humidity = data["main"]["humidity"]
wind_speed = data["wind"]["speed"]
description = data["weather"][0]["description"]

print("Current weather in", city)
print(f"Temperature: {temperature} °C")
print(f"Humidity: {humidity} %")
print(f"Wind speed: {wind_speed} m/s")
print("Description:", description)
