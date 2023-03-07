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
largeCardDiv.classList.add('forecast-item');

// Get the current date and format it
const currentDate = new Date();
const currentDateFormat = { weekday: 'short', month: 'short', day: 'numeric' };

// Add the current date to the large card
const dateDiv = document.createElement('div');
dateDiv.textContent = currentDate.toLocaleDateString('en-US', currentDateFormat);
largeCardDiv.appendChild(dateDiv);

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

// Add the current wind speed to the large card
const windDiv = document.createElement('div');
windDiv.textContent = `Wind: ${data.list[0].wind.speed} mph`;
largeCardDiv.appendChild(windDiv);

// Add the current humidity to the large card
const humidityDiv = document.createElement('div');
humidityDiv.textContent = `Humidity: ${data.list[0].main.humidity}%`;
largeCardDiv.appendChild(humidityDiv);

// Add the large card to the forecastDiv
forecastDiv.insertBefore(largeCardDiv, forecastDiv.firstChild);


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
    
      // Save the searched city to local storage and add it to the search history
      addSearchedCityToHistory(city);
    })
    // This logs error to the console log if any of the previous fetch functions do not work.
    .catch(error => console.log(error));
}

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
searchItem.addEventListener('click', () => getWeatherForecast(searchHistory[i]));
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