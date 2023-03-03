const apikey = '84b1f784083597760ab80c6e7e75720c'; // Replace YOUR_API_KEY with your actual API key from OpenWeatherMap
const city = ''; // The name of the city you want to get the weather forecast for
// Using the OpenWeatherMap APIs, we retrieve geographical coordinates given a city name
const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const lat = data[0].lat; // This will retrieve the latitude coordinate for the specified city
    const lon = data[0].lon; // This will retrieve the longitude coordinate for the specified city
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
  })
  .catch(error => console.log(error));
