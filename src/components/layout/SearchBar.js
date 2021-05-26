import React from "react";

const SearchBox = (props) => (
  <div className="input-field">
    <input id="search" type="search" />
    <label className="label-icon" for="search">
      <i className="material-icons">search</i>
    </label>
    <i className="material-icons">close</i>
  </div>
);

export default SearchBox;
