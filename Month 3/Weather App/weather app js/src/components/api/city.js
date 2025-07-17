export async function fetchWeatherData(city) {
    const API_KEY = "1a19e7763c77142fd6b2b5cab6b6ec98"
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}