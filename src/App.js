import React from "react";
import "./styles.css";

import CurrentDate from "./CurrentDate";
import AppLogo from "./AppLogo";
import Search from "./Search";
import CurrentCity from "./CurrentCity";
import Conversion from "./Conversion";
import Intro from "./Intro";
import CurrentWeatherImage from "./CurrentWeatherImage";
import SunEvents from "./SunEvents";
import CurrentConditions from "./CurrentConditions";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <CurrentDate />
          <header>
            <div className="row">
              <AppLogo />
              <Search />
              <CurrentCity />
            </div>
            <div className="align-right">
              <Conversion />
            </div>
          </header>
          <div className="card container">
            <div className="date">
              <Intro />
            </div>
            <div className="row currentWeatherWrapper">
              <CurrentWeatherImage />
              <SunEvents />
              <CurrentConditions />
            </div>
          </div>
        </div>
      <footer>
            This app was built by Sara Oliveira for <a href="https://www.shecodes.io/" target="_blank">SheCodes
                React</a>.
            <br />
            You can take a look at the code on the <a href="https://github.com/pointspotdot/react-weather-app" target="_blank">repository</a> on GitHub.
        </footer>
      </div>
    </div>
  );
}
