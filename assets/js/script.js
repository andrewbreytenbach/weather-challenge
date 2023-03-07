const apikey = '84b1f784083597760ab80c6e7e75720c';

function getWeatherForecast() {
  // This sets the city variable equivalent to whatever city was searched for.
  const city = document.getElementById('city-input').value;
  // This is the weather api for the 5 day forecast
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;

  // Fetch the latitude and longitude for the city
  fetch(geoUrl)
    .then(response => response.json())
    .then(data => {
      const lat = data[0].lat;
      const lon = data[0].lon;
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;

      // Fetch the current weather data
      fetch(currentUrl)
        .then(response => response.json())
        .then(data => {
          // Create elements for displaying the current weather data
          const currentWeatherDiv = document.getElementById('current-weather');
          currentWeatherDiv.innerHTML = '';

          const cityName = data.name;
          const currentDate = new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
          const currentTemp = Math.round(data.main.temp);
          const currentIconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
          const currentHumidity = data.main.humidity;
          const currentWindSpeed = data.wind.speed;

          const cityDiv = document.createElement('div');
          const cityHeader = document.createElement('h2');
          cityHeader.textContent = cityName;
          cityDiv.appendChild(cityHeader);

          const dateDiv = document.createElement('div');
          dateDiv.textContent = currentDate;
          cityDiv.appendChild(dateDiv);

          const currentIconImg = document.createElement('img');
          currentIconImg.src = currentIconUrl;
          cityDiv.appendChild(currentIconImg);

          const currentTempDiv = document.createElement('p');
          currentTempDiv.classList.add('temp');
          currentTempDiv.textContent = `${currentTemp}°F`;
          cityDiv.appendChild(currentTempDiv);

          const currentHumidityDiv = document.createElement('p');
          currentHumidityDiv.textContent = `Humidity: ${currentHumidity}%`;
          cityDiv.appendChild(currentHumidityDiv);

          const currentWindDiv = document.createElement('p');
          currentWindDiv.textContent = `Wind: ${currentWindSpeed} mph`;
          cityDiv.appendChild(currentWindDiv);

          currentWeatherDiv.appendChild(cityDiv);
        })
       
          // Use a basic fetch function to use the current weather api previously declared
  fetch(currentUrl)
  // This is basic syntax for a fetch function 
  .then(response => response.json())
  .then(data => {
    const currentWeatherDiv = document.getElementById('current-weather');
    currentWeatherDiv.innerHTML = '';

    const cityName = data.name;
    const currentDate = new Date(data.dt * 1000).toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'});
    const currentTemp = Math.round(data.main.temp);
    const currentIconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const currentHumidity = data.main.humidity;
    const currentWindSpeed = data.wind.speed;

    const cityDiv = document.createElement('div');
    const cityHeader = document.createElement('h2');
    cityHeader.textContent = cityName;
    cityDiv.appendChild(cityHeader);

    const dateDiv = document.createElement('div');
    dateDiv.textContent = currentDate;
    cityDiv.appendChild(dateDiv);

    const currentIconImg = document.createElement('img');
    currentIconImg.src = currentIconUrl;
    cityDiv.appendChild(currentIconImg);

    const currentTempDiv = document.createElement('p');
    currentTempDiv.classList.add('temp');
    currentTempDiv.textContent = `${currentTemp}°F`;
    cityDiv.appendChild(currentTempDiv);

    const currentHumidityDiv = document.createElement('p');
    currentHumidityDiv.textContent = `Humidity: ${currentHumidity}%`;
    cityDiv.appendChild(currentHumidityDiv);

    const currentWindDiv = document.createElement('p');
    currentWindDiv.textContent = `Wind: ${currentWindSpeed} mph`;
    cityDiv.appendChild(currentWindDiv);

    currentWeatherDiv.appendChild(cityDiv);
  })
  .catch(error => console.log(error));

// Use a for loop to display the 5-day forecast
for (let i = 0; i < data.list.length; i++) {
  const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00'))[i];
  const date = forecast ? new Date(forecast.dt * 1000) : null;
  const temp = forecast.main ? Math.round(forecast.main.temp) : '';
  const humidity = forecast.main.humidity;
  const windSpeed = forecast.wind.speed;
  const iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

  // Create a div element for each forecast item
  const forecastItemDiv = document.createElement('div');
  forecastItemDiv.classList.add('list-group', 'text-center');

  // Add the date to the forecast item
  const dateDiv = document.createElement('div');
  const forecastDate = date.toLocaleDateString('en-US', {weekday: 'short'});
  dateDiv.textContent = forecastDate;
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
  humidityDiv.textContent = 'Humidity: ${humidity}%';
  forecastItemDiv.appendChild(humidityDiv);

        // Add the forecast item to the forecast div
        forecastDiv.appendChild(forecastItemDiv);
    }

    // Save the searched city to local storage and add it to the search history
    addSearchedCityToHistory(city);
  })
  // This logs error to the console log if any of the previous fetch functions do not work.
  .catch(error => console.log(error));
};

// Get search history from local storage and display it on the page
function displaySearchHistory() {
const searchHistory = getSearchHistoryFromLocalStorage();
if (searchHistory && searchHistory.length > 0) {
const searchHistoryDiv = document.getElementById('search-history');
const searchHistoryList = document.createElement('ul');
searchHistoryList.classList.add('search-history-list');
for (let i = 0; i < searchHistory.length; i++) {
const searchItem = document.createElement('li');
searchItem.textContent = searchHistory[i];
searchItem.classList.add('search-history-item');
searchItem.addEventListener('click', () => getWeatherForecast(searchHistory[i].trim()));
searchHistoryList.appendChild(searchItem);
}
searchHistoryDiv.appendChild(searchHistoryList);
}
}

displaySearchHistory();

// Save search history to local storage
function saveSearchHistoryToLocalStorage(searchHistory) {
localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Add searched city to search history
function addSearchedCityToHistory(city) {
let searchHistory = getSearchHistoryFromLocalStorage();
if (!searchHistory) {
searchHistory = [];
}
if (!searchHistory.includes(city)) {
searchHistory.unshift(city);
if (searchHistory.length > 10) {
searchHistory.pop();
}
saveSearchHistoryToLocalStorage(searchHistory);
}
displaySearchHistory();
}

// Get search history from local storage
function getSearchHistoryFromLocalStorage() {
const searchHistory = localStorage.getItem('searchHistory');
if (searchHistory) {
return JSON.parse(searchHistory);
}
return null;
}

// Clear the search history from local storage and from the page
function clearSearchHistory() {
localStorage.removeItem('searchHistory');
const searchHistoryDiv = document.getElementById('search-history');
searchHistoryDiv.innerHTML = '';
}

// Set up event listeners
const form = document.getElementById('search-form');
const clearButton = document.getElementById('clear-button');

// Call getWeatherForecast function when the form is submitted
form.addEventListener('submit', (event) => {
event.preventDefault();
getWeatherForecast();
});

// Call clearSearchHistory function when the clear button is clicked
clearButton.addEventListener('click', clearSearchHistory);

