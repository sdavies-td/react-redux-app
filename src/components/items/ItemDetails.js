import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Loader from "../layout/Loader";

const ItemDetails = (props) => {
  const { auth, item } = props;
  if (!auth.uid) return <Redirect to="/auth/signin" />;
  if (item) {
    return (
      <div>
        <div className="container section item-details">
          <div className="row center">
            <h4>Item</h4>
          </div>
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{item.name}</span>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Created By: {item.createdByName}</div>
              <div>
                Date Created: {moment(item.createdAt.toDate()).calendar()}
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
  const items = state.firestore.data.items;
  const item = items ? items[id] : null;
  return {
    item,
    auth: state.firebase.auth,
    id,
  };
};

export default compose(
  firestoreConnect(() => {
    return [{ collection: "items" }];
  }),
  connect(mapStateToProps)
)(ItemDetails);
