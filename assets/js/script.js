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
      // This url automatically makes the weather units in the imperial system so no later conversion is needed
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;

      // This returns the forecast url of the specified city with its latitude and longitudinal coordinates
      return fetch(forecastUrl);
    })
    // This is (again) basic syntax for a fetch function 
    .then(response => response.json())
    .then(data => {
      // This declares a variable that will then be used to display the forecast to the html
      const forecastDiv = document.getElementById('forecast');
      // This clears any existing content in the html
      forecastDiv.innerHTML = ''; 

      // Create a div element for the large card
      const largeCardDiv = document.createElement('div');
      largeCardDiv.classList.add('large-card');

      // Add an image for the weather icon
      const iconImg = document.createElement('img');
      const iconUrl = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
      iconImg.src = iconUrl;
      iconImg.alt = data.list[0].weather[0].description;
      largeCardDiv.appendChild(iconImg);

      // Add the current temperature to the large card
      const tempDiv = document.createElement('div');
      const currentTemp = Math.round(data.list[0].main.temp);
      tempDiv.textContent = `${currentTemp}°F`;
      largeCardDiv.appendChild(tempDiv);

      // Add the current weather description to the large card
      const descriptionDiv = document.createElement('div');
      descriptionDiv.textContent = data.list[0].weather[0].description;
      largeCardDiv.appendChild(descriptionDiv);

      // Add the large card to the forecastDiv
      forecastDiv.appendChild(largeCardDiv);

    // Use a for loop to display the 5-day forecast
for (let i = 0; i < data.list.length; i++) {
    const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00'))[i];
    const date = new Date(forecast.dt * 1000);
    const temp = Math.round(forecast.main.temp);
    const description = forecast.weather[0].description;
    const humidity = forecast.main.humidity;
    const windSpeed = forecast.wind.speed;
    const iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
  
    // Create a div element for each forecast item
    const forecastItemDiv = document.createElement('div');
    forecastItemDiv.classList.add('forecast-item');
  
    // Add the date to the forecast item
    const dateDiv = document.createElement('div');
    dateDiv.textContent = date.toLocaleDateString();
    forecastItemDiv.appendChild(dateDiv);
  
    // Add the weather icon to the forecast item
    const iconImg = document.createElement('img');
    iconImg.src = iconUrl;
    forecastItemDiv.appendChild(iconImg);
  
    // Add the temperature to the forecast item
    const tempDiv = document.createElement('div');
    tempDiv.textContent = `${temp}°F`;
    forecastItemDiv.appendChild(tempDiv);
  
    // Add the wind speed to the forecast item
    const windDiv = document.createElement('div');
    windDiv.textContent = `Wind: ${windSpeed} mph`;
    forecastItemDiv.appendChild(windDiv);
  
    // Add the humidity to the forecast item
    const humidityDiv = document.createElement('div');
    humidityDiv.textContent = `Humidity: ${humidity}%`;
    forecastItemDiv.appendChild(humidityDiv);
  
    // Add the forecast item to the forecast div
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.appendChild(forecastItemDiv);
  }
  
    })
    // This logs error to the console log if any of the previous fetch functions do not work.
    .catch(error => console.log(error));
}

// This function retrieves the weather for a city in the search history when the city is clicked
function getWeatherForCity(city) {
document.getElementById('city').value = city;
getWeatherForecast();
}

// This adds an event listener to the search button so that when it is clicked, the weather forecast for the searched city is displayed
const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', getWeatherForecast);