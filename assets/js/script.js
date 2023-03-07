const API_KEY = '84b1f784083597760ab80c6e7e75720c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Select DOM elements
const searchForm = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');
const searchHistory = document.querySelector('#search-history');
const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');

// Initialize variables
let city = '';
let history = [];

// Load search history from localStorage
if (localStorage.getItem('history')) {
    history = JSON.parse(localStorage.getItem('history'));
    renderSearchHistory();
}

// Listen for form submit event
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    city = cityInput.value.trim();

    if (city) {
        // Save search history to localStorage
        history.push(city);
        localStorage.setItem('history', JSON.stringify(history));

        // Update UI
        renderCurrentWeather();
        renderForecast();
        renderSearchHistory();
    }

    // Reset form
    searchForm.reset();
});

// Listen for click event on search history items
searchHistory.addEventListener('click', e => {
    if (e.target.classList.contains('search-history-item')) {
        city = e.target.textContent;
        renderCurrentWeather();
        renderForecast();
        setActiveHistoryItem(e.target);
    }
});

// Render current weather for the selected city
async function renderCurrentWeather() {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=imperial&appid=${API_KEY}`);
        const data = await response.json();

        // Update UI
        currentWeather.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${new Date().toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
            <div>
                <p class="temp">${Math.round(data.main.temp)}°F</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} mph</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
    }
}

// Render 5-day forecast for the selected city
async function renderForecast() {
    try {
        const response = await fetch(`${BASE_URL}/forecast?q=${city}&units=imperial&appid=${API_KEY}`);
        const data = await response.json();

        // Get forecast data for the next 5 days at 12:00 PM
        const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        // Update UI
        forecast.innerHTML = '';
        forecastData.forEach(item => {
            forecast.innerHTML += `
                <div class="forecast-card">
                    <h3>${new Date(item.dt_txt).toLocaleDateString()}</h3>
                    <img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
                    <p class="temp">${Math.round(item.main.temp)}°F</p>
                    <p>Wind Speed: ${item.wind.speed} mph</p>
                    <p>Humidity: ${item.main.humidity}%</p>
                </div>
            `;
        });
    } catch (error) {
        console.error(error);
    }
}

// Render search history
function renderSearchHistory() {
    searchHistory.innerHTML = '';
    history.slice(-5).forEach(item => {
        searchHistory.innerHTML += `<li class="search-history-item">${item}</li>`;
    });
    setActiveHistoryItem(searchHistory.firstChild);
}


// Set active class on search history item
function setActiveHistoryItem(item) {
    const activeItem = document.querySelector('.search-history-item.active');
    if (activeItem) {
        activeItem.classList.remove('active');
    }

    item.classList.add('active');
}

// Listen for click event on search history items
searchHistory.addEventListener('click', e => {
    if (e.target.classList.contains('search-history-item')) {
        city = e.target.textContent;
        renderCurrentWeather();
        renderForecast();
        setActiveHistoryItem(e.target);
    }
});

// Update UI and save search history on form submit
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    city = cityInput.value.trim();

    if (city) {
        // Save search history to localStorage
        history.push(city);
        localStorage.setItem('history', JSON.stringify(history));

        // Update UI
        renderCurrentWeather();
        renderForecast();
        renderSearchHistory();
    }

    // Reset form
    searchForm.reset();
});

// Load search history from localStorage
if (localStorage.getItem('history')) {
    history = JSON.parse(localStorage.getItem('history'));
    renderSearchHistory();
}
