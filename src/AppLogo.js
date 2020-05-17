import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AppLogo.css";

export default function AppLogo() {
  return (
    <div className="col appLogo">
      <FontAwesomeIcon icon={["fas", "poo-storm"]} />
      <i className="fas fa-poo-storm" />
      <div className="appTitle">WeatherApp</div>
    </div>
  );
}
