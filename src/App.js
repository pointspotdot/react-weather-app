import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

import CurrentDate from "./CurrentDate";
import AppLogo from "./AppLogo";
import CurrentCity from "./CurrentCity";
import Intro from "./Intro";
import CurrentWeatherImage from "./CurrentWeatherImage";
import SunEvents from "./SunEvents";
import CurrentConditions from "./CurrentConditions";
import Forecast from "./Forecast";

const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apikey = "41745d4e1b63d5f8653e46a51bfe8b21";

let lon;
let lat;

export default function App() {
  let [units, setUnits] = useState("metric");
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [currentWeatherImages, setCurrentWeatherImages] = useState(null);
  let [currentForecast, setCurrentForecast] = useState([]);
  let [currentCity, setCurrentCity] = useState(null);

  function handleSearch(event) {
    event.preventDefault();
    let city = document.querySelector("#searchField").value;
    city = city === "" ? currentCity : city.trim().toLowerCase();
    handleCity(city);
  }

  function editAppData(data) {
    let currentUnits;

    if (units === "metric") {
      currentUnits = {
        temp: "ºC",
        wind: "m/s",
      };
    }

    if (units === "imperial") {
      currentUnits = {
        temp: "ºF",
        wind: "mph",
      };
    }

    setCurrentCity(data.name + ", " + data.sys.country);
    setWeatherImages(data.weather);
    setWeatherData({
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      minTemp: data.main.temp_min.toFixed(1) + " " + currentUnits.temp,
      maxTemp: data.main.temp_max.toFixed(1) + " " + currentUnits.temp,
      averageTemp: data.main.feels_like.toFixed(1) + " " + currentUnits.temp,
      windSpeed: data.wind.speed + " " + currentUnits.wind,
      humidity: data.main.humidity,
      ready: true,
    });
  }

  function handleCity(city) {
    axios
      .get(weatherUrl, {
        params: {
          q: city,
          appid: apikey,
          units: units,
        },
      })
      .then(function (response) {
        // handle success
        lat = response.data.coord.lat;
        lon = response.data.coord.lon;
        editAppData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert("An error has occurred. 😣 Please try again.");
      })
      .then(function () {
        // always executed
        axios
          .get(forecastUrl, {
            params: {
              q: city,
              units: units,
              appid: apikey,
            },
          })
          .then(function (response) {
            // handle success
            editForecast(response.data.list);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert("An error has occurred. 😣 Please try again.");
          });
      });
  }

  function getFromLocation(latitude, longitude) {
    axios
      .get(weatherUrl, {
        params: {
          lat: latitude,
          lon: longitude,
          units: units,
          appid: apikey,
        },
      })
      .then(function (response) {
        // handle success
        lat = response.data.coord.lat;
        lon = response.data.coord.lon;
        editAppData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert("An error has occurred. 😣 Please try again.");
      })
      .then(function () {
        // always executed
        axios
          .get(forecastUrl, {
            params: {
              lat: latitude,
              lon: longitude,
              units: units,
              appid: apikey,
            },
          })
          .then(function (response) {
            // handle success
            editForecast(response.data.list);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert("An error has occurred. 😣 Please try again.");
          });
      });
  }

  function handleLocation() {
    navigator.geolocation.getCurrentPosition(handlePosition);
  }

  function handlePosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    getFromLocation(lat, lon);
  }

  function changeToMetric() {
    if (units === "metric") {
      return;
    }
    setUnits("metric");
    getFromLocation(lat, lon);
  }

  function changeToImperial() {
    if (units === "imperial") {
      return;
    }
    setUnits("imperial");
    getFromLocation(lat, lon);
  }

  function setWeatherImages(weather) {
    let images = [];
    for (let item in Object.entries(weather)) {
      let icon = weather[item].icon;
      let description = weather[item].description;

      images.push(
        <CurrentWeatherImage key={item} icon={icon} description={description} />
      );
    }

    setCurrentWeatherImages(images);
  }

  function editForecast(data) {
    let tempUnit;
    if (units === "metric") {
      tempUnit = " ºC";
    } else {
      tempUnit = " ºF";
    }

    let query = 7;
    let forecast = [];

    for (let i = 1; i <= 5; i++) {
      let index = i;
      let date = handleForecastDay(data[query].dt);
      let imageSrc = data[query].weather[0].icon;
      let description = data[query].weather[0].description;
      let temp = data[query].main.temp.toFixed(1) + tempUnit;

      query += 8;

      forecast.push(
        <Forecast
          key={index}
          date={date}
          imageSrc={imageSrc}
          description={description}
          temp={temp}
        />
      );
    }

    setCurrentForecast(forecast);
  }

  function handleForecastDay(timeInUnix) {
    let date = new Date(timeInUnix * 1000);
    let sentence = date.getDate() + "-";

    switch (date.getMonth()) {
      case 0:
        sentence += "Jan-";
        break;
      case 1:
        sentence += "Feb-";
        break;
      case 2:
        sentence += "Mar-";
        break;
      case 3:
        sentence += "Apr-";
        break;
      case 4:
        sentence += "May-";
        break;
      case 5:
        sentence += "Jun-";
        break;
      case 6:
        sentence += "Jul-";
        break;
      case 7:
        sentence += "Aug-";
        break;
      case 8:
        sentence += "Sep-";
        break;
      case 9:
        sentence += "Oct-";
        break;
      case 10:
        sentence += "Nov-";
        break;
      case 11:
        sentence += "Dec-";
        break;
      default:
    }

    return (sentence += date.getFullYear());
  }

  return (
    <div className="App">
      <div className="container main">
        <div className="row">
          <CurrentDate />
          <header>
            <div className="row">
              <AppLogo />
              <div className="col-6 searchGroup">
                <form id="search-form" onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="text"
                      id="searchField"
                      className="form-control searchField"
                      placeholder="Search for city..."
                      name="search"
                    />
                    <div className="input-group-addon input-group-addon-btn">
                      <button
                        type="submit"
                        className="btn btn-light form-control"
                        onClick={handleSearch}
                      >
                        <i className="fa fa-search" />
                      </button>
                      <button
                        id="locationButton"
                        type="button"
                        className="btn btn-light form-control"
                        onClick={handleLocation}
                      >
                        <i className="fas fa-compass" />
                      </button>
                    </div>
                  </div>
                </form>
                <div className="note">
                  You can search by city or by location by pressing the second
                  button, have fun!
                </div>
              </div>
              <CurrentCity currentCity={currentCity} />
            </div>
            {weatherData.ready ? (
              <div className="align-right">
                {units === "metric" ? (
                  <button className="tempButton" onClick={changeToImperial}>
                    Do you want to see the <br />
                    information in imperial units?
                  </button>
                ) : (
                  <button className="tempButton" onClick={changeToMetric}>
                    Do you want to see the <br />
                    information in metric units?
                  </button>
                )}
              </div>
            ) : (
              ""
            )}
          </header>
          {weatherData.ready ? (
            <div className="card container">
              <div className="date">
                <Intro city={currentCity} />
              </div>
              <div className="row currentWeatherWrapper">
                <div className="col-5">
                  <div id="weatherConditionsWrapper">
                    <div id="currentConditionsWrapper">
                      {currentWeatherImages}
                    </div>
                  </div>
                </div>
                <SunEvents
                  sunrise={weatherData.sunrise}
                  sunset={weatherData.sunset}
                />
                <CurrentConditions
                  minTemp={weatherData.minTemp}
                  maxTemp={weatherData.maxTemp}
                  averageTemp={weatherData.averageTemp}
                  windSpeed={weatherData.windSpeed}
                  humidity={weatherData.humidity}
                />
              </div>
              <div className="row forecastWrapper">{currentForecast}</div>
            </div>
          ) : (
            <div className="loader"></div>
          )}
          <footer>
            This app was built by Sara Oliveira for{" "}
            <a href="https://www.shecodes.io/"> SheCodes React</a>.
            <br />
            You can take a look at the code on the{" "}
            <a href="https://github.com/pointspotdot/react-weather-app">
              repository
            </a>{" "}
            on GitHub.
          </footer>
        </div>
      </div>
    </div>
  );
}
