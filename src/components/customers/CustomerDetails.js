import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Loader from "../layout/Loader";

const CustomerDetails = (props) => {
  const { auth, customer } = props;
  if (!auth.uid) return <Redirect to="/auth/signin" />;
  if (customer) {
    return (
      <div className="container section customer-details">
        <div className="row center">
          <h4>Customer</h4>
        </div>
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{customer.fullName}</span>
            <div>
              <p>Email: </p>
              <p>{customer.email}</p>
            </div>
            <div>
              <p>Phone: </p>
              <p>{customer.phone}</p>
            </div>
            <div>
              <p>Address: </p>
              <p>{customer.address}</p>
            </div>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Created By: {customer.createdByName}</div>
            <div>
              Date Created: {moment(customer.createdAt.toDate()).calendar()}
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
  const customers = state.firestore.data.customers;
  const customer = customers ? customers[id] : null;
  return {
    customer,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "customers",
    },
  ])
)(CustomerDetails);
