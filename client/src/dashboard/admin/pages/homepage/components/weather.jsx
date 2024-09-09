import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../../hooks/http-requests.hooks.admin";

const WeatherBox = () => {
  const [weather, setWeather] = useState({
    temp: "Loading...",
    feels_like: "Loading...",
    description: "Loading...",
    icon: "Loading...",
    city: "Loading...",
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await fetchWeather();
        setWeather(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="h-96 bg-violet-300 rounded-3xl p-10 ">
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt=""
      />
      <div>
        <div>
          <p>Temperature {weather.temp} C</p>
        </div>
        <div>
          <p>Feels Like {weather.feels_like} C</p>
        </div>
        <div>
          <p>
            {weather.description} at {weather.city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
