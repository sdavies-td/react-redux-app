import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import { Button, Icon } from "@material-ui/core";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    orderPin: null,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/orders" />;
    return (
      <div className="container">
        <div className="row center">
          <h4>Sign Up</h4>
        </div>
        <form onSubmit={this.handleSubmit} className="white">
          <div className="input-field ">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              class="validate"
              required=""
              aria-required="true"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="orderPin">Order Pin</label>
            <input type="number" id="orderPin" onChange={this.handleChange} />
          </div>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
