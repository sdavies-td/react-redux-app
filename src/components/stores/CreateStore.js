import React, { Component } from "react";
import { connect } from "react-redux";
import { createStore } from "../../store/actions/storeActions";
import { Redirect } from "react-router-dom";

class CreateStore extends Component {
  state = {
    name: "",
    address: "",
    bank: "",
    gst: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createStore(this.state);
    this.props.history.push("/stores");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darker-3">Create Store</h5>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="bank">Bank Account</label>
            <input type="text" id="bank" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="gst">GST</label>
            <input type="text" id="gst" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    stores: state.firestore.ordered.stores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createStore: (store) => dispatch(createStore(store)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);
