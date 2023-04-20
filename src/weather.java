// import java.net.*;
// import java.io.*;
// import org.json.simple.*;
// import org.json.simple.parser.*;

// public class Weather {
//     private static final String API_KEY = "your_openweathermap_api_key_here";

//     public static void main(String[] args) throws Exception {
//         String location = "New York";
//         String currentWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + API_KEY;
//         String forecastWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid="
//                 + API_KEY;

//         JSONObject currentWeather = getWeatherData(currentWeatherUrl);
//         JSONObject forecastWeather = getWeatherData(forecastWeatherUrl);

//         // Code for displaying weather information on the website can be added here
//     }

//     public static JSONObject getWeatherData(String url) throws Exception {
//         URL weatherUrl = new URL(url);
//         HttpURLConnection conn = (HttpURLConnection) weatherUrl.openConnection();
//         conn.setRequestMethod("GET");
//         BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//         StringBuilder weatherData = new StringBuilder();
//         String line;
//         while ((line = reader.readLine()) != null) {
//             weatherData.append(line);
//         }
//         reader.close();
//         JSONParser parser = new JSONParser();
//         JSONObject weatherJSON = (JSONObject) parser.parse(weatherData.toString());
//         return weatherJSON;
//     }
// }
