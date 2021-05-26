import React, { Component } from "react";
import { connect } from "react-redux";
import { createCustomer } from "../../store/actions/customerActions";
import { Redirect } from "react-router-dom";

class CreateCustomer extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    fullName: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    this.setState(
      {
        fullName: this.state.firstName + " " + this.state.lastName,
      },
      () => {
        e.preventDefault();
        this.props.createCustomer(this.state);
        this.props.history.push("/customers");
      }
    );
  };
  render() {
    const { auth } = this.props;
    console.log(auth);
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darker-3">Create Customer</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" onChange={this.handleChange} />
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
    customers: state.firestore.ordered.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCustomer: (customer) => dispatch(createCustomer(customer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer);
