import React from "react";
import axios from "axios";
import "./Search.css";

let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";
let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apikey = "41745d4e1b63d5f8653e46a51bfe8b21";
let units = "metric";
let currentyCity;
let lon;
let lat;

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
      // currentCity = response.data.name;
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

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#searchField").value;
  city = city.trim().toLowerCase();

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

export default function Search() {
  return (
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
        You can search by city or by location by pressing the second button,
        have fun!
      </div>
    </div>
  );
}
