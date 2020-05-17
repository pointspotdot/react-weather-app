import React from "react";
import "./Search.css";

export default function Search() {
  return (
    <div className="col-6 searchGroup">
      <form id="search-form">
        <div className="input-group">
          <input
            type="text"
            id="searchField"
            className="form-control searchField"
            placeholder="Search for city..."
            name="search"
          />
          <div className="input-group-addon input-group-addon-btn">
            <button type="submit" className="btn btn-light form-control">
              <i className="fa fa-search" />
            </button>
            <button
              id="locationButton"
              type="button"
              className="btn btn-light form-control"
            >
              <i className="fas fa-compass" />
            </button>
          </div>
        </div>
      </form>
      <div className="note">
        You can search by city or by location by pressing the second button,
        have fun!
      </div>
    </div>
  );
}
