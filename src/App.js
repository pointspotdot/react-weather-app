import React from "react";
import "./styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontAwesome";

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
      <div className="container wholeApp">
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
      </div>
    </div>
  );
}
