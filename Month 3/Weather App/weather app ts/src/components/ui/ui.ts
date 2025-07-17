interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number };
}

const cityInput = document.getElementById('city-input') as HTMLInputElement;
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;
const errorContainer = document.getElementById('error-container') as HTMLElement;
const weatherContainer = document.getElementById('weather-container') as HTMLElement;
const cityNameElement = document.getElementById('city-name') as HTMLElement;
const temperatureElement = document.getElementById('temperature') as HTMLElement;
const weatherDescriptionElement = document.getElementById('weather-description') as HTMLElement;
const humidityElement = document.getElementById('humidity') as HTMLElement;
const windSpeedElement = document.getElementById('wind-speed') as HTMLElement;

function displayWeatherData(data: WeatherData): void {
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

function showError(message: string): void {
  errorContainer.textContent = message;
  errorContainer.style.display = 'block';
  weatherContainer.style.display = 'none';
}

function clearError(): void {
  errorContainer.textContent = '';
  errorContainer.style.display = 'none';
}

function getCity(): string {
  return cityInput.value.trim();
}

function setCity(city: string): void {
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
