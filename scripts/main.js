/*
 * Programmer: Chris Heise (https://github.com/crHeise)
 * Date: 23 February, 2024
 * Project: The Odin Project - Weather Forecast Application
 * File: main.js
 * Purpose: Manipulate the DOM in response to user actions.
 */

// Set global variables for API keys (not a good practice, but it's fine for this project)
const WEATHER_API_KEY = "7f68d477db6949f78c2190831242302";
const GIPHY_API_KEY = "Pfi361TMcaa8GoBSK3IfXMW0MayJMHJV";

// Set global variables for the API URLs
let weatherURL = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=`;
let giphyURL = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=`;

// Setup the DOM elements/variables
let cityName = document.getElementById('city-name');
let submitButton = document.getElementById('get-weather-button');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let feelsLike = document.getElementById('feels-like');
let conditions = document.getElementById('conditions');
let conditionsGif = document.getElementById('conditions-gif');

async function getWeatherData(cityName) {
    const response = await fetch(`${weatherURL}${cityName}`);
    const weatherData = await response.json();

    city.textContent = weatherData.location.name; 
    temperature.textContent = `Temp: ${weatherData.current.temp_f}°F`;
    feelsLike.textContent = `Feels like: ${weatherData.current.feelslike_f}°F`;
    conditions.textContent = `Conditions: ${weatherData.current.condition.text}`;

    let currentConditions = String(weatherData.current.condition.text);
    let conditionsTrimmed = currentConditions.replace(/\s+/g, '');

    fetch(`${giphyURL}${conditionsTrimmed}weather`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response.data.images.original.url);
        conditionsGif.setAttribute('src', response.data.images.original.url);   // not currently working: third party cookies issue
    });
}

submitButton.addEventListener('click', () => {
    getWeatherData(cityName.value);
});