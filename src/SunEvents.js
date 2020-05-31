import React from "react";

function handleEvents(timeInUnix) {
  let date = new Date(timeInUnix * 1000);
  let sentence = date.getHours() + ":";

  if (date.getMinutes() < 10) {
    sentence += "0" + date.getMinutes();
  } else {
    sentence += date.getMinutes();
  }
  return sentence;
}

export default function SunEvents(props) {
  let sunrise = handleEvents(props.sunrise);
  let sunset = handleEvents(props.sunset);

  return (
    <div className="col-2 sunEventsWrapper">
      <div className="sunEvents">
        <div id="sunrise">
          <i className="fas fa-arrow-up"></i>
          <i className="fas fa-sun"></i> Sunrise is at {sunrise}
        </div>
        <br />
        <div id="sunset">
          <i className="fas fa-arrow-down"></i>
          <i className="fas fa-sun"></i> Sunset is at {sunset}
        </div>
      </div>
    </div>
  );
}
