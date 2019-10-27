var key = "319266d53bf2eed6ff7eb7701d29e0f2";
var KELVIN = 273;
//variables that select all the classes for the data a few target the data inside the paragraphs
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//weather object, stores all the data.
const weather = {};

weather.temperature = {
    unit: "celsius"
}
//Check to see if user has Geolocation active.
//function getCurrentPosition(setPosition, error) {
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    console.log("Hi");
} else {
    console.log("Damn");
    notificationElement.style.display = "block";
    //makes the error display to the user
    notificationElement.innerHTML = "</p>Browser Doesn't support Geolocation</p>"
}


//function that changes all the inner elements diplaying the weather
// - sets icons, temp value, weather description, and the city/country
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
};

//simple temperature conversion function
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit === "celsius") {
        //call the celsius function, it will return a decimal
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        //get rid of the decimal with floor function
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit} <span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        //sets the weather object temp back to celsius
        tempElement.innerHTML = `${weather.temperature.value} <span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}`
}
//grabs the weather object and stores it in data.
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}