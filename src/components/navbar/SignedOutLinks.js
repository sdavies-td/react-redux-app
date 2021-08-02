import React, { Component } from "react";
import { connect } from "react-redux";
import { signInWithGoogle } from "../../store/actions/authActions";

import GoogleButton from "react-google-button";

class SignedOutLinks extends Component {
  render() {
    return (
      <GoogleButton
        onClick={() => {
          this.props.signInWithGoogle();
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInWithGoogle: () => dispatch(signInWithGoogle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedOutLinks);
