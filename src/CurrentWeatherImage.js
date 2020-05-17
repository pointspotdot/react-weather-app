import React from "react";

export default function CurrentWeatherImage() {
  return (
    <div className="col-5">
      <div id="weatherConditionsWrapper">
        <div id="currentConditionsWrapper">
          <div>
            <img id="icon" src="" alt="" />
            <div id="description" />
          </div>
        </div>
      </div>
    </div>
  );
}
