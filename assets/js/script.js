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

            // This is (again) basic syntax for a fetch function 
            .then(response => response.json())
            .then(data => {
                // This declares a variable that will then be used to display the forecast to the html
                const forecastDiv = document.getElementById('forecast');
                // This clears any existing content in the html
                forecastDiv.innerHTML = ''; 
                
                // This uses a for loop to go through all of the times in the aforementioned array
                for (let i = 0; i < data.list.length; i++) {
                    // This uses the data list ability to store new variables for the forecast
                    const forecast = data.list[i];
                    // This sets a date using current time measurements 
                    const date = new Date(forecast.dt * 1000);
                    // This converts the temperature from Kelvin to Fahrenheit
                    const temp = Math.round((forecast.main.temp - 273.15) * 9/5 + 32);
                    // This sets a new variable that will give a description of the weather forecast in the html
                    const description = forecast.weather[0].description;
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

                }