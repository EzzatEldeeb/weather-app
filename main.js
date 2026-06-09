const main = document.getElementById("weather-result");
const searchInput = document.querySelector(".search-container input");
const searchBtn = document.querySelector(".search-container button");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    main.innerHTML = `<p style="color: red;">Please enter a city name!</p>`;
  }
});

async function getWeather(city) {
  try {
    main.innerHTML = `<p>Loading...</p>`;
    const api = `http://api.weatherapi.com/v1/current.json?key=a59e5e847e044882a23171048260806&q=${city}&aqi=no`;

    const response = await fetch(api);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log(data);

    main.innerHTML = `
      <div class="card">
        <h2>${data.location.name}, ${data.location.country}</h2>
        <h3>${data.current.temp_c}°C</h3>
        <p>${data.current.condition.text}</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind: ${data.current.wind_kph} kph</p>
        <p>Last Updated: ${data.current.last_updated}</p>
        <p>Feels Like: ${data.current.feelslike_c}°C</p>
        <p>condition: ${data.current.condition.text}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    main.innerHTML = `<p>Sorry, we couldn't find "${city}". Please try again.</p>`;
  }
}
