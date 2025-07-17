const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const errorContainer = document.getElementById('error-container');
const weatherContainer = document.getElementById('weather-container');
const cityNameElement = document.getElementById('city-name');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weather-description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
function displayWeatherData(data) {
    const cityName = data.name;
    const country = data.sys.country;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    cityNameElement.textContent = `${cityName}, ${country}`;
    temperatureElement.textContent = `${temperature}°C`;
    weatherDescriptionElement.textContent = description;
    humidityElement.textContent = `${humidity}%`;
    windSpeedElement.textContent = `${windSpeed} m/s`;
    weatherContainer.style.display = 'block';
}
function showError(message) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    weatherContainer.style.display = 'none';
}
function clearError() {
    errorContainer.textContent = '';
    errorContainer.style.display = 'none';
}
function getCity() {
    return cityInput.value.trim();
}
function setCity(city) {
    cityInput.value = city;
}
export const UI = {
    cityInput,
    searchBtn,
    displayWeatherData,
    showError,
    clearError,
    getCity,
    setCity,
};
