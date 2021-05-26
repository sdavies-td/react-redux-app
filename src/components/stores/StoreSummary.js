import React from "react";
import moment from "moment";

const StoreSummary = ({ store }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{store.name}</span>
      </div>
      <div className="card-action grey lighten-4 grey-text">
        <div>Created By: {store.createdByName}</div>
        <div>Date Created: {moment(store.createdAt.toDate()).calendar()}</div>
      </div>
    </div>
  );
};

export default StoreSummary;
