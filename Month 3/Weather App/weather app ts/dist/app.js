import { fetchWeatherData } from './components/api/city.js';
import { UI } from './components/ui/ui.js';
import { Storage } from './components/storage/storage.js';
window.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadLastCity();
    const checkViewportWidth = () => {
        if (window.innerWidth < 375) {
            alert("This website is not accessible on devices with a width less than 375px.");
        }
    };
    setInterval(checkViewportWidth, 1);
});
function setupEventListeners() {
    UI.searchBtn.addEventListener('click', searchWeather);
    UI.cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });
}
function searchWeather() {
    const city = UI.getCity();
    if (!city) {
        UI.showError('Please enter a city name');
        return;
    }
    Storage.saveCity(city);
    UI.clearError();
    fetchWeatherData(city)
        .then(data => UI.displayWeatherData(data))
        .catch((error) => {
        UI.showError(error.message);
    });
}
function loadLastCity() {
    const lastCity = Storage.getLastCity();
    if (lastCity) {
        UI.setCity(lastCity);
        searchWeather();
    }
}
