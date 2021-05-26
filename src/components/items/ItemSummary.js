import React from "react";
import moment from "moment";

const ItemSummary = ({ item }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{item.name}</span>
      </div>
      <div className="card-action grey lighten-4 grey-text">
        <div>Created By: {item.createdByName}</div>
        <div>Date Created: {moment(item.createdAt.toDate()).calendar()}</div>
      </div>
    </div>
  );
};

export default ItemSummary;
