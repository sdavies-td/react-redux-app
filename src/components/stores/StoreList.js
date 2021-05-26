import React, { useState } from "react";
import StoreSummary from "./StoreSummary";
import { Link } from "react-router-dom";

const StoreList = ({ stores }) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="store-list section">
      <div className="input-field">
        <input
          id="search"
          type="search"
          value={value}
          onChange={handleChange}
        />
        <label className="label-icon" htmlFor="search">
          <i className="material-icons">search</i>
        </label>
        <i className="material-icons">close</i>
      </div>
      {stores &&
        stores
          .filter((store) => {
            if (value === "") {
              return store;
            } else if (store.name.toLowerCase().includes(value.toLowerCase())) {
              return store;
            }
            return null;
          })
          .map((store) => {
            return (
              <Link to={"/stores/store/" + store.id} key={store.id}>
                <StoreSummary store={store} />
              </Link>
            );
          })}
    </div>
  );
};

export default StoreList;
