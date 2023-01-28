
import './defult.css'
import keys from './keys';
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL
}
function App() {
  const databuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  }
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then((results) => {
          setQuery("");
          setWeather(results);
          console.log(results);
        })
    }
  }

  return (
    <div className={typeof weather.main != "undefined"? weather.main.temp > 30 ? "app hot" :" app cold" :"app"}>
      <div className="search-container my-4">
        <div className='row'>
          <div className='col-9 my-2'>
            <TextField
              id="outlined-multiline-flexible"
              label="search the country you'd like to know"
              multiline
              maxRows={4}
              fullWidth
              className='mx-5'
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
        </div>
      </div>
      {typeof weather.main != "undefined" ? (
        <div>
          <div className="location-container">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className='date'>{databuild(new Date())}</div>
            <div className='weather-container'>
              <div className='temperature'>
                {Math.round( weather.main.temp)}°C
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        </div>
      ) : (""

      )}
    </div>
  );
}

export default App;
