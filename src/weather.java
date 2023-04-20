// import java.io.*;
// import java.net.*;
// import org.json.*;

// public class weather {

//     private static final String OPEN_WEATHER_MAP_API =
//             "https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric";

//     private static final String OPEN_WEATHER_MAP_API_KEY = "9226ed0b9dd0791ba0039533eae0c888";
//     ;

//     public static void main(String[] args) throws Exception {

//         String city = "Stockholm";
//         if (args.length > 0) {
//             city = args[0];
//         }

//         String urlString = String.format(OPEN_WEATHER_MAP_API, city, OPEN_WEATHER_MAP_API_KEY);
//         URL url = new URL(urlString);
//         HttpURLConnection connection = (HttpURLConnection) url.openConnection();

//         BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));

//         String line;
//         StringBuilder responseBuilder = new StringBuilder();
//         while ((line = reader.readLine()) != null) {
//             responseBuilder.append(line);
//         }
//         reader.close();

//         JSONObject response = new JSONObject(responseBuilder.toString());

//         JSONObject main = response.getJSONObject("main");
//         double temperature = main.getDouble("temp");
//         int humidity = main.getInt("humidity");

//         JSONObject wind = response.getJSONObject("wind");
//         double windSpeed = wind.getDouble("speed");

//         JSONArray weather = response.getJSONArray("weather");
//         String description = weather.getJSONObject(0).getString("description");

//         System.out.println("Current weather in " + city);
//         System.out.println("Temperature: " + temperature + " °C");
//         System.out.println("Humidity: " + humidity + " %");
//         System.out.println("Wind speed: " + windSpeed + " m/s");
//         System.out.println("Description: " + description);
//     }
// }

