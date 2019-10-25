const notification_ele = document.querySelector(".notification");
const icon_ele = document.querySelector(".weather-icon");
const temp_ele = document.querySelector(".temperature-value");
const desc_ele = document.querySelector(".temerature-description");
const location_ele = document.querySelector(".location");

const weather = {
    temerature: {
        value: 0,
        unit: "fahrenheit"
    },
    description : "N/A",
    iconId: "01d",
    city : "Salt Lake City",
    country : "USA"
};

displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    
    tempElement.innerHTML = 0C `${weather.temperature.value}<span>C</span>`;
    descElement.innerHTML = Clear sky  weather.description;
    
    locationElement.innerHTML = Salt Lake City
    `${weather.city}, ${weather.country}`;
    }

    