import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Loader from "../layout/Loader";

const StoreDetails = (props) => {
  const { auth, store } = props;
  if (!auth.uid) return <Redirect to="/auth/signin" />;
  if (store) {
    return (
      <div>
        <div className="container section store-details">
          <div className="row center">
            <h4>Store</h4>
          </div>
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{store.name}</span>
              <div>
                <p>Bank: </p>
                <p>{store.bank}</p>
              </div>
              <div>
                <p>Address: </p>
                <p>{store.address}</p>
              </div>
              <div>
                <p>GST: </p>
                <p>{store.gst}</p>
              </div>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Created By: {store.createdByName}</div>
              <div>
                Date Created: {moment(store.createdAt.toDate()).calendar()}
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
  const stores = state.firestore.data.stores;
  const store = stores ? stores[id] : null;
  return {
    store,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "stores",
    },
  ])
)(StoreDetails);
