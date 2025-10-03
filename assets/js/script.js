const apiKey = "f76a2d9a0c694cc5bea22555250310";

async function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  const astroUrl = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${city}`;


  try {
    const response = await fetch(url);
    const data = await response.json();

    const astroResponse = await fetch(astroUrl);
    const astroData = await astroResponse.json();

    document.getElementById("city").innerText = data.location.name;
    document.getElementById("temp").innerText = `${Math.round(data.current.temp_c)}°C`;
    document.getElementById("wind").innerText = `${data.current.wind_kph} km/h`;

    document.getElementById("sunrise").innerText = astroData.astronomy.astro.sunrise;
    document.getElementById("sunset").innerText = astroData.astronomy.astro.sunset;

    document.getElementById("icon").src = "https:" + data.current.condition.icon;

    const hour = new Date().getHours();
    const greeting = document.getElementById("greeting");
    const app = document.getElementById("weather");
    app.classList.remove("day", "night");

    if (hour >= 6 && hour < 18) {
      greeting.innerText = "Good Morning";
      app.classList.add("day");
    } else {
      greeting.innerText = "Good Night";
      app.classList.add("night");
    }

    document.getElementById("date-time").innerText =
      new Date(data.location.localtime).toLocaleString();
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("City not found. Try again!");
  }
}

function searchCity() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    fetchWeather(city);
  }
}

fetchWeather("Philippines");
