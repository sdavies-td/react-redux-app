import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Loader from "../layout/Loader";

const OrderDetails = (props) => {
  const { auth, order } = props;
  if (!auth.uid) return <Redirect to="/auth/signin" />;
  if (order) {
    return (
      <div>
        <div className="container section order-details">
          <div className="row center">
            <h4>Order</h4>
          </div>
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{order.title}</span>
              <p>{order.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Created By: {order.createdByName}</div>
              <div>
                Date Created: {moment(order.createdAt.toDate()).calendar()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const orders = state.firestore.data.orders;
  const order = orders ? orders[id] : null;
  return {
    order,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "orders",
    },
  ])
)(OrderDetails);
