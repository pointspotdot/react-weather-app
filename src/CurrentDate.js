import React from "react";

import "./CurrentDate.css";

let currentDate = formatDate();

export default function CurrentDate() {
  formatDate();

  return (
    <div id="date" className="appTitle card-title date">
      {currentDate}
    </div>
  );
}

function formatDate() {
  let date = new Date();
  let sentence = "Last updated: ";
  switch (date.getDay()) {
    case 0:
      sentence += "Sunday, ";
      break;
    case 1:
      sentence += "Monday, ";
      break;
    case 2:
      sentence += "Tuesday, ";
      break;
    case 3:
      sentence += "Wednesday, ";
      break;
    case 4:
      sentence += "Thursday, ";
      break;
    case 5:
      sentence += "Friday, ";
      break;
    case 6:
      sentence += "Saturday, ";
      break;
    default:
  }

  switch (date.getMonth()) {
    case 0:
      sentence += "January ";
      break;
    case 1:
      sentence += "February ";
      break;
    case 2:
      sentence += "March ";
      break;
    case 3:
      sentence += "April ";
      break;
    case 4:
      sentence += "May ";
      break;
    case 5:
      sentence += "June ";
      break;
    case 6:
      sentence += "July ";
      break;
    case 7:
      sentence += "August ";
      break;
    case 8:
      sentence += "September ";
      break;
    case 9:
      sentence += "October ";
      break;
    case 10:
      sentence += "November ";
      break;
    case 11:
      sentence += "December ";
      break;
    default:
  }

  sentence +=
    date.getDate() + " " + date.getFullYear() + " - " + date.getHours() + ":";

  if (date.getMinutes() < 10) {
    sentence += "0" + date.getMinutes();
  } else {
    sentence += date.getMinutes();
  }
  currentDate = sentence;
}
