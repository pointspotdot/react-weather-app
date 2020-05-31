import React from "react";

export default function CurrentWeatherImage(props) {
  let src = "http://openweathermap.org/img/wn/" + props.icon + "@2x.png";
  let description = props.description;
  return (

          <div>
            <img id="icon" src={src} alt="" />
            <div id="description">{description}</div>
          </div>
  );
}
