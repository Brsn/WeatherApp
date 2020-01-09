var key = "319266d53bf2eed6ff7eb7701d29e0f2";
var randKey = "319266d53bf2eed6ff7eb7701d29e0f2";
var KELVIN = 273;
//variables that select all the classes for the data a few target the data inside the paragraphs
const iconElement = document.querySelector(".weather-icon-two");
const iconElementTwo = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const tempElementTwo = document.querySelector(".temperature-value-two p");
const descElement = document.querySelector(".temperature-description p");
const descElementTwo = document.querySelector(".temperature-description-two p");
const locationElement = document.querySelector(".location p");
const locationElementTwo = document.querySelector(".location-two p");
const notificationElement = document.querySelector(".notification");
const maxLat = (Math.random() * 180) - 90;
const maxLong = (Math.random() * 360) - 180;


//weather object, stores all the data.
const weather = {};
const randWeather = {};
console.log(weather);
console.log(randWeather);

weather.temperature = {
    unit: "celsius"
}

randWeather.temperature = {
    unit: "celsisus"
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

function displayRandomWeather() {
    iconElementTwo.innerHTML = `<img src="icons/${randWeather.iconId}.png"/>`;
    tempElementTwo.innerHTML = `${randWeather.temperature.value}°<span>C</span>`;
    descElementTwo.innerHTML = randWeather.description;
    locationElementTwo.innerHTML = `${randWeather.city}, ${randWeather.country}`;
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

tempElementTwo.addEventListener("click", function () {
    if (randWeather.temperature.value === undefined) return;
    if (randWeather.temperature.unit === "celsius") {
        //call the celsius function, it will return a decimal
        let fahrenheit = celsiusToFahrenheit(randWeather.temperature.value);
        //get rid of the decimal with floor function
        fahrenheit = Math.floor(fahrenheit);
        tempElementTwo.innerHTML = `${fahrenheit} <span>F</span>`;
        randWeather.temperature.unit = "fahrenheit";
    } else {
        //sets the weather object temp back to celsius
        tempElementTwo.innerHTML = `${randWeather.temperature.value} <span>C</span>`;
        randWeather.temperature.unit = "celsius";
    }
});


function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function setRandPosition() {
    getRandomWeather(maxLat, maxLong);
}
setRandPosition();
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}`
}
//grabs the weather object and stores it in data.
function getWeather(latitude, longitude) {
    //function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api)
    //  console.log(api = `http://api.openweathermap.org/data/2.5/weather?lat=${maxLat}&lon=${maxLong}&appid=${key}`);


    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            //grabs api object information
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            console.log(data.main.temp);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}
function getRandomWeather(maxLat, maxLong) {
    let randApi = `https://api.openweathermap.org/data/2.5/weather?lat=${maxLat}&lon=${maxLong}&appid=${randKey}`;

    fetch(randApi)
        .then(function (response) {
            let randData = response.json();
            console.log("Yooo");
            return randData;
        })
        //grabs api object information
        .then(function (randData) {
            randWeather.temperature.value = Math.floor(randData.main.temp - KELVIN);
            console.log("What?");
            randWeather.description = randData.weather[0].description;
            console.log("What? :)");
            randWeather.iconId = randData.weather[0].icon;
            console.log("What?!");
            randWeather.city = randData.name;
            randWeather.country = randData.sys.country;
            console.log("Yooo!!");
        })
        .then(function () {
            displayRandomWeather();
        });
}