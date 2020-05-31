import React from "react";

export default function Intro(props) {
  let city = props.city.split(",");

  return (
    <div className="introText appTitle">
      The weather for <span id="city">{city[0]}</span> is:
    </div>
  );
}
