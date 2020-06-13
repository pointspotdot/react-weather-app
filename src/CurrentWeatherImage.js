import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function CurrentWeatherImage(props) {
  let icon;

  switch (props.icon.substring(0, 2)) {
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
  }

  return (
    <div className="weatherImage">
      <ReactAnimatedWeather
        icon={icon}
        size={128}
        animate={true}
      />
      <div id="description">{props.description}</div>
    </div>
  );
}
