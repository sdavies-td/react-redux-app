import React from "react";
import moment from "moment";

const OrderSummary = ({ order }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{order.title}</span>
        <p>Created By: {order.createdByName}</p>
        <p className="grey-text">
          Created: {moment(order.createdAt.toDate()).calendar()}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
