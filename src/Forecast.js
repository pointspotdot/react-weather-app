import React from "react";

export default function Forecast(props) {
  let day = "day" + props.index;
  let iconId = "iconDay" + props.index;
  let tempClass = "day" + props.index + "temp";
  let descClass = "day" + props.index + "desc";

  return (
    <div className="col-sm">
      <div className="card">
        <div id={day} className="card-header appTitle">
          {props.date}
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col weatherSymbol">
              <img id={iconId} src={props.imageSrc} alt={props.imageAlt} />
            </div>
            <div className="col forecastTemp">
              <i className="fas fa-temperature-high"></i>
              <span className={tempClass} id="temperature">
                {props.temp}
              </span>
            </div>
          </div>
          <span className={descClass}>{props.description}</span>
        </div>
      </div>
    </div>
  );
}
