// This sets a variable using my API key that can then be plugged into the url later.
const apikey = '84b1f784083597760ab80c6e7e75720c'; 

// This is the function the html file will call when the submit button is clicked to get the weather forecast for the searched city.
function getWeatherForecast() {
    // This sets the city variable equivalent to whatever city was searched for.
    const city = document.getElementById('city').value;
    // This is the weather api for the 5 day forecast
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;
}