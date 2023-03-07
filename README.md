# Weather-Challenge

## About The Project

The goal of this project was to create a weather application using JavaScript code. 

It declares constants for an API key and the base URL for the OpenWeatherMap API. It selects DOM elements using querySelector and initializes variables for the city and search history.

It loads the search history from localStorage if it exists, using JSON.parse to convert the stored string to an array of strings. It then renders the search history to the page using a function.

It adds an event listener for the form submit event, which prevents the default behavior of submitting the form and updates the city variable with the trimmed value of the input field. If the city value is not empty, it pushes it to the history array, saves the history to localStorage, updates the current weather and forecast, and renders the search history to the page. Finally, it resets the form.

It also adds an event listener for click events on the search history items, which updates the city variable with the text content of the clicked item, renders the current weather and forecast, and sets the active class on the clicked item.

The code defines two functions for rendering the current weather and forecast for the selected city. They make API calls to the OpenWeatherMap API, passing in the API key, city name, and units as query parameters, and await the response using the fetch function. The response is then converted to JSON format using the json function. The data returned by the API is used to update the UI by setting the innerHTML property of the relevant elements.

The code also defines a function for rendering the search history, which clears the searchHistory element, loops over the last five items in the history array using slice, and adds a new li element with the class search-history-item for each item. It also sets the active class on the first item using a separate function.

Finally, the code declares a function for setting the active class on the search history item. It first removes the active class from any existing active item, and then adds the active class to the clicked item.

Overall, this code allows users to search for the current weather and forecast for a given city, and view their search history.

### Built With

* HTML 
* CSS
* JavaScript
* APIs


## Getting Started

In order to acess this website, just visit the following webpage: [https://github.com/andrewbreytenbach/weather-challenge](https://andrewbreytenbach.github.io/weather-challenge/?)

To get a local copy up and running, simply view the index.html file, stle.css, or the script.js file and see how you can play around, copy, and edit the file for personal usage. You can also change the features displayed for each day as well as the icons used to display the weather. 

## Usage

Once the user first acceses the weather app, the following image is what they will find: 

![Start Page](/assets/images/launch.png "Start Page")

In order to access the weather api, the user will need to type a search into the search bar, as indicated by the image below, and then click the 'search' button.

![Search Bar](/assets/images/search-bar.png "Search Bar")

Once the user clicks the 'search' button, the webpage will refresh with the city's current weather as well as weather for the 5 day forecast. It will display temperature, wind speed, and humidity. The city the user just searched for will also be displayed on the right under search history. 

![New Search](/assets/images/new-search.png "New Search")

If a user wishes to view the weather for a city they have previsouly searched for, they simply can click on the list item under the search history and the page will display that city's weather, as shown below.

![Search Item](/assets/images/search-item.png "Search Item")
 

## License

There is no license this repo was distributed under. 

## Contact

Andrew Breytenbach

Project Link: [https://github.com/andrewbreytenbach/weather-challenge](https://andrewbreytenbach.github.io/weather-challenge/?)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

* [https://www.w3docs.com/] (W3 Docs)
* [https://developer.mozilla.org/en-US/] (MDN Web Docs)
* [https://html.com/] (HTML for Beginners)
* [https://blog.hubspot.com/website/css-tutorial] (The Ultimate CSS Tutorial for Beginner Programmers)
* [https://www.w3schools.com/js/] (JavaScript Tutorial)
* [https://developer.mozilla.org/en-US/docs/Web/API] (APIs)
* [https://www.geeksforgeeks.org/weather-app-using-vanilla-javascript/] (Weather app using Vanilla JavaScript)
* [https://webdesign.tutsplus.com/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893] (Build a Simple Weather App With Vanilla JavaScript)
* [https://dev.to/shantanu_jana/how-to-make-a-weather-app-using-javascript-4lke] (How to Make a Weather App using JavaScript)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function] (async function)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators] (try/wait)