// This sets a variable using my API key that can then be plugged into the url later.
const apikey = '84b1f784083597760ab80c6e7e75720c'; 

// This is the function the html file will call when the submit button is clicked to get the weather forecast for the searched city.
function getWeatherForecast() {
    // This sets the city variable equivalent to whatever city was searched for.
    const city = document.getElementById('city').value;
    // This is the weather api for the 5 day forecast
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;

    // This uses a basic fetch function to use the 5 day forecast api previously declared
    fetch(geoUrl)
        // This is basic syntax for a fetch function 
        .then(response => response.json())
        .then(data => {
            // This uses an API that gets the latitude and longitude of the city put into the search
            const lat = data[0].lat;
            const lon = data[0].lon;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;
            
            // This returns the forecast url of the specified city with its latitude and longitudinal coordinates
            return fetch(forecastUrl);
            })

            // This is (agani) basic syntax for a fetch function 
            .then(response => response.json())
            .then(data => {
                // This declares a variable that will then be used to display the forecast to the html
                const forecastDiv = document.getElementById('forecast');
                // This clears any existing content in the html
                forecastDiv.innerHTML = ''; 
}