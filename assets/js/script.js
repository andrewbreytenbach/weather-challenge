const apikey = '84b1f784083597760ab80c6e7e75720c'; // Replace YOUR_API_KEY with your actual API key from OpenWeatherMap
const city = ''; // The name of the city you want to get the weather forecast for
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data.list); // This will log an array of objects representing the weather forecast for the next 5 days
  })
  .catch(error => console.log(error));
