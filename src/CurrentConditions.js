import React from "react";

export default function CurrentConditions() {
  return (
    <div className="col">
      <div id="currentTemps">
        <div className="forecast">
          <span>The temperature will vary between</span>
          <br />
          <i className="fas fa-temperature-low min" />
          <span>a low of </span>
          <span className="currentDayMin" id="temperature" />
          <br />
          <i className="fas fa-temperature-high max" />
          <span>and a high of </span>
          <span className="currentDayMax" id="temperature" />
          <br />
          <i className="fas fa-temperature-high" />
          <span>In average, today will feel like </span>
          <span className="currentDayRealFeel" id="temperature" />
          <br />
          <br />
          <span>
            The wind speed will reach <span id="wind" />
            <span id="degrees" />
          </span>
          <br />
          <span>
            The humidity is <span id="humidity" />%
          </span>
        </div>
      </div>
    </div>
  );
}
