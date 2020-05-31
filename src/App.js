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

let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";
let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apikey = "41745d4e1b63d5f8653e46a51bfe8b21";
let lon;
let lat;

export default function App() {
  let [currentCity, setCurrentCity] = useState("Porto, PT");
  let [units, setUnits] = useState("metric");

  function handleSearch(event) {
    event.preventDefault();
    let city = document.querySelector("#searchField").value;
    city = city === "" ? currentCity : city.trim().toLowerCase();

    handleCity(city);
  }

  function handleCity(city) {
    axios
      .get(weatherUrl, {
        params: {
          q: city,
          units: units,
          appid: apikey,
        },
      })
      .then(function (response) {
        // handle success
        lat = response.data.coord.lat;
        lon = response.data.coord.lon;
        setCurrentCity(response.data.name + ", " + response.data.sys.country);
        console.log(response);
        // editAppData(response.data);
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
            console.log(response);

            // editForecast(response.data.list);
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
        console.log(response);
        setCurrentCity(response.data.name + ", " + response.data.sys.country);
        // editAppData(response.data);
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
            console.log(response);
            // editForecast(response.data.list);
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
    handleCity(currentCity);
  }

  function changeToImperial() {
    if (units === "imperial") {
      return;
    }
    setUnits("imperial");
    handleCity(currentCity);
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
            <div className="align-right">
              {units === "metric" ? (
                <button className="tempButton" onClick={changeToImperial}>
                  Do you want to see the information in imperial units?
                </button>
              ) : (
                <button className="tempButton" onClick={changeToMetric}>
                  Do you want to see the information in metric units?
                </button>
              )}
            </div>
          </header>
          <div className="card container">
            <div className="date">
              <Intro city={currentCity} />
            </div>
            <div className="row currentWeatherWrapper">
              <CurrentWeatherImage />
              <SunEvents />
              <CurrentConditions />
            </div>
          </div>
        </div>
        <footer>
          This app was built by Sara Oliveira for{" "}
          <a href="https://www.shecodes.io/">SheCodes React</a>.
          <br />
          You can take a look at the code on the{" "}
          <a href="https://github.com/pointspotdot/react-weather-app">
            repository
          </a>{" "}
          on GitHub.
        </footer>
      </div>
    </div>
  );
}
