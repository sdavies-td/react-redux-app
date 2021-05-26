import React, { useState } from "react";
import ItemSummary from "./ItemSummary";
import { Link } from "react-router-dom";

const ItemList = ({ items }) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="item-list section">
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
      {items &&
        items
          .filter((item) => {
            if (value === "") {
              return item;
            } else if (item.id.toLowerCase().includes(value.toLowerCase())) {
              return item;
            }
            return null;
          })
          .map((item) => {
            return (
              <Link to={"/items/view/" + item.id} key={item.id}>
                <ItemSummary item={item} />
              </Link>
            );
          })}
    </div>
  );
};

export default ItemList;
