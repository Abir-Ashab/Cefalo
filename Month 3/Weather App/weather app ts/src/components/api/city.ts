// here the
export async function fetchWeatherData(city: string): Promise<any> {
    const apiKey = "1a19e7763c77142fd6b2b5cab6b6ec98"
    console.log(apiKey);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    return response.json();
}