import React from "react";
import moment from "moment";

const CustomerSummary = ({ customer }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{customer.fullName}</span>
        <div className="grey-text">
          <p>Created By:</p>
          <p> {customer.createdByName}</p>
        </div>
        <p className="grey-text">
          Created: {moment(customer.createdAt.toDate()).calendar()}
        </p>
      </div>
    </div>
  );
};

export default CustomerSummary;
