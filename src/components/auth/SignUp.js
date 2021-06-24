import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { signUp } from "../../store/actions/authActions";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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
    const { auth, classes } = this.props;
    if (auth.uid) return <Redirect to="/orders" />;
    return (
      <div className={classes.root}>
        <Grid>
          <Grid className={classes.header}>
            <Typography variant="h5">Sign Up</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.body}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit} className="white">
              <Grid item xs>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid item xs>
                <TextField
                  type="text"
                  label="First Name"
                  id="firstName"
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid item xs>
                <TextField
                  type="text"
                  label="Last Name"
                  id="lastName"
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid item xs className={classes.button}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  Sign Up
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(SignUp);
