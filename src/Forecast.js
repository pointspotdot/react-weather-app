import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function Forecast(props) {
  let icon;

  switch (props.imageSrc.substring(0, 2)) {
    case "01":
      icon = "CLEAR_DAY";
      break;
    case "02":
      icon = "PARTLY_CLOUDY_DAY";
      break;
    case "03":
    case "04":
      icon = "CLOUDY";
      break;
    case "09":
    case "10":
    case "11":
      icon = "RAIN";
      break;
    case "13":
      icon = "SNOW";
      break;
    case "50":
      icon = "FOG";
      break;
    default:
      break;
  }

  return (
    <div className="col-sm">
      <div className="card">
        <div className="card-header appTitle">{props.date}</div>
        <div className="card-body">
          <div className="row">
            <div className="col weatherSymbol">
              <ReactAnimatedWeather icon={icon} size={64} animate={true} />
            </div>
            <div className="col forecastTemp">
              <i className="fas fa-temperature-high"></i>
              <span className="temperature"> {props.temp}</span>
            </div>
          </div>
          <span>{props.description}</span>
        </div>
      </div>
    </div>
  );
}
