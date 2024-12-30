import React, { useState } from 'react';
import logo from '../images/bx-search-alt.svg';
import clouds from '../images/clouds.png';
import clear from '../images/clear.png';
import rain from '../images/rain.png';
import mist from '../images/mist.png';
import heavyRain from '../images/heavy rain.png';
import sun from '../images/sun.png';
import drizzle from '../images/drizzle.png'

export default function Main() {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [wind, setWind] = useState('');
  const [icon, setIcon] = useState('');
  const [query, setQuery] = useState('');

  const apikey = "9aa3042434467b710ecdd2f6f6a3eb14";
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${query}`;

  async function checkWeather() {
    if (query) {
      const response = await fetch(apiurl + `&appid=${apikey}`);
      const data = await response.json();

      console.log(data);

      setCity(data.name);
      setTemp(Math.round(data.main.temp) + '°C');
      setHumidity(data.main.humidity + '%');
      setWind(data.wind.speed + ' km/h');

      switch(data.weather[0].main.toLowerCase()) {
        case 'clouds':
          setIcon(clouds);
          break;
        case 'clear':
          setIcon(clear);
          break;
        case 'rain':
          setIcon(rain);
          break;
        case 'mist':
          setIcon(mist);
          break;
        case 'heavy rain':
          setIcon(heavyRain);
          break;
        case 'sun':
          setIcon(sun);
          break;
           case 'drizzle':
            setIcon(drizzle);
            break;
        default:
          setIcon(''); // Default icon or leave it empty
      }
    }
  }

  return (
    <div className="Main">
      <div className="search">
        <input
          type="search"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" onClick={checkWeather}>
          <img src={logo} alt="Search" />
        </button>
      </div>
      <div className="weather">
        {icon && <img src={icon} alt="Weather Icon" className="icon" />}
        <h1 className="temp">{temp}</h1>
        <h2 className="city">{city}</h2>
        <div className="details">
          <div className="col">
            <img
              src="https://img.freepik.com/premium-vector/moist-line-icon-blue-water-droplet_79145-1511.jpg"
              alt="Humidity Icon"
            />
            <div>
              <p className="humidity">{humidity}</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img
              src="https://png.pngtree.com/png-vector/20190411/ourlarge/pngtree-vector-air-blow-icon-png-image_924578.jpg"
              alt="Wind Speed Icon"
            />
            <div>
              <p className="wind">{wind}</p>
              <p>Wind speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
