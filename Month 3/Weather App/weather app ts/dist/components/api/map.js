"use strict";
const map = L.map("map").setView([20, 0], 2); // eta aro bhalo set korte hobe
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);
let apiKey = "1a19e7763c77142fd6b2b5cab6b6ec98";
map.on("click", function (e) {
    const { lat, lng } = e.latlng;
    console.log("Clicked at:", lat, lng);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
        .then((response) => response.json())
        // It is simiar to response.text().then(text => JSON.parse(text)); which internally uses JSON.parse().
        .then((data) => {
        const weatherDiv = document.getElementById("weather-info");
        if (weatherDiv) {
            weatherDiv.innerHTML = `
          <strong>Weather at (${lat.toFixed(2)}, ${lng.toFixed(2)}):</strong><br>
          ${data.weather[0].description}<br>
          Temp: ${data.main.temp}°C<br>
          Humidity: ${data.main.humidity}%<br>
          Wind Speed: ${data.wind.speed} m/s
        `;
        }
        else {
            console.error("Error: 'weather-info' element not found.");
        }
    })
        .catch((err) => {
        console.error("Error fetching weather:", err);
    });
});
