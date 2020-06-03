import React from "react";

export default function CurrentConditions(props) {
  return (
    <div className="col">
      <div id="currentTemps">
        <div className="forecast">
          <span>Temperatures:</span>
          <br />
          <i className="fas fa-temperature-low min" />
          <span>Low: </span>
          <span className="currentDayMin" id="temperature">
            {props.minTemp}
          </span>
          <br />
          <i className="fas fa-temperature-high max" />
          <span>High: </span>
          <span className="currentDayMax" id="temperature">
            {props.maxTemp}
          </span>
          <br />
          <i className="fas fa-temperature-high" />
          <span>Average: </span>
          <span className="currentDayRealFeel" id="temperature">
            {props.averageTemp}
          </span>
          <br />
          <br />
          <span>
            <span>Wind speed: </span>
            <span id="wind">{props.windSpeed}</span>
          </span>
          <br />
          <span>
            Humidity: <span id="humidity">{props.humidity}</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
