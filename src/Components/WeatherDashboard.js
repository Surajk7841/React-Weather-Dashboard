import React, { useState } from "react";
import Header from "./Header";
import "./WeatherDashboard.css";

function WeatherDashboard() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchWeather(city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ccf3bbb3629f11f62b4c98039149094&units=metric`
    );
    return response.json();
  }

  const addCity = async () => {
    if (search.trim() === "") {
      return alert("Type something");
    }

    const weather = await fetchWeather(search);
    if (weather) {
      setCities([...cities, weather]);
      setSearch("");
    }
  };

  const deleteCity = (cityName) => {
    setCities(cities.filter((city) => city.name !== cityName));
  };

  return (
    <div>
      <Header />
      <div className="inputDiv">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={addCity}>Add City</button>
      </div>
      <div className="cardDiv">
        {cities.map((city) => (
          <div className="infoDiv" key={city.name}>
            <h2>{city.name}</h2>
            <p>Temperature: {city.main && city.main.temp}&deg;C</p>
            <button onClick={() => deleteCity(city.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default WeatherDashboard;
