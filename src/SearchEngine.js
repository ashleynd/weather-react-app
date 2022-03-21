import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine(props) {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setTemperature(true);
    console.log(response.data);
    setWeather({
      name: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelslike: response.data.main.feels_like,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      main: response.data.weather[0].main,
      description: response.data.weather[0].description,
      temperature_max: response.data.main.temp_max,
      temperature_min: response.data.main.temp_min,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let units = "imperial";
    let apiKey = "3a94f3778290bfeee61278505dbbe51d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (temperature) {
    return (
      <div className="background">
        <form onSubmit={handleSubmit}>
          <input
            className="searchbar"
            type="search"
            placeholder="Search by city name"
            onChange={updateCity}
          />
          <input type="submit" value="🔎" className="searchbutton" />
        </form>
          <div><img src={weather.icon} alt={weather.description} /></div>
          <div className="temp">{Math.round(weather.temperature)}°F</div>
          <div className="cityname">📍{weather.name}, {weather.country}</div>
          <div className="description">{weather.description}</div>
          {/* <div>{weather.main}</div> */}
          <div className="feelslike">Feels like: {Math.round(weather.feelslike)}°F</div>
          <div className="humidity">Humidity: {weather.humidity}%</div>
          <div className="humidity">Wind Speed: {weather.wind}mph</div>
          <div className="lowandhigh">⬆️  {Math.round(weather.temperature_max)}°F | ⬇️ {Math.round(weather.temperature_min)}°F</div>
          {/* <div>Today's low: {Math.round(weather.temperature_min)}°F</div> */}
        </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="searchbar"
          placeholder="Search for a city"
          onChange={updateCity}
        />
        <input type="submit" value="🔎" className="searchbutton" />
      </form>
    );
  }
}
