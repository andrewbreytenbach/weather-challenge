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
                // This creates a variable from the search history id in the html
                const searchHistory = document.getElementById('search-history');
                // This creates a div in the html that the city name will be stored in
                const cityDiv = document.createElement('div');
                // This displays the name of the city to the text content in the html
                cityDiv.textContent = city;
                // This adds a list item to the city div
                cityDiv.classList.add('search-history-item');
                // This adds an event listener so a function is run to get the weather for the city when the city is clicked
                cityDiv.addEventListener('click', () => {
                    getWeatherForCity(city);
                });
                // This appends the city that was searched for to the search history list items in the html.
                searchHistory.appendChild(cityDiv);

                // This uses a for loop to go through all of the times in the aforementioned array
                for (let i = 0; i < data.list.length; i++) {
                     // Get forecast data for the next 5 days at 12:00 PM
                    const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00'))[i];
                    // This sets a date using current time measurements 
                    const date = new Date(forecast.dt * 1000);
                    // This this gets the temperature using a function that will display it in imperial units
                    const temp = Math.round(forecast.main.temp);
                    // This sets a new variable that will give a description of the weather forecast in the html
                    const description = forecast.weather[0].description;
                    // 
                    const humidity = forecast.main.humidity;
                    // 
                    const windSpeed = forecast.wind.speed;
                    // This sets a new variable using a url for various weather icons that will be displayed to the html
                    const iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
                    const forecastItem = document.createElement('div');
                    forecastItem.classList.add('forecast-item');
                    
                    // This creates a date that will then be appended to the weather forecast item being displayed on the html
                    const dateDiv = document.createElement('div');
                    dateDiv.textContent = date.toLocaleDateString();
                    forecastItem.appendChild(dateDiv);
                    
                    // This gives a weather icon to the forecast being displayed in the html
                    const iconImg = document.createElement('img');
                    iconImg.src = iconUrl;
                    forecastItem.appendChild(iconImg);
      
                    // This creates a temperature variable that will be appended to the forecast being displayed on the html
                    const tempDiv = document.createElement('div');
                    tempDiv.textContent = `${temp}°F`;
                    forecastItem.appendChild(tempDiv);

                    // 
                    const windDiv = document.createElement('div');
                    windDiv.textContent = `Wind: ${windSpeed} mph`;
                    forecastItem.appendChild(windDiv);
  
                    //
                    const humidityDiv = document.createElement('div');
                    humidityDiv.textContent = `Humidity: ${humidity}%`;
                    forecastItem.appendChild(humidityDiv);
  
      
                    // This attaches a description of the forecast to the items in the html
                    const descriptionDiv = document.createElement('div');
                    descriptionDiv.textContent = description;
                    forecastItem.appendChild(descriptionDiv);
      
                    // This appends all of the previously listed forecast items to the div element in the html
                    forecastDiv.appendChild(forecastItem);
                  }
                })
                // This logs error to the console log if any of the previous fetch functions do not work.
                .catch(error => console.log(error));

                // This function retrieves the weather for a city in the search history when the city is clicked
                function getWeatherForCity(city) {
                    document.getElementById('city').value = city;
                    getWeatherForecast();
                  }

                }