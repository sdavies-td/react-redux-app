import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { signUp } from "../../store/actions/authActions";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(2),
  },
  button: {
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
});

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
    const { auth, classes } = this.props;
    if (auth.uid) return <Redirect to="/orders" />;
    return (
      <div className={classes.root}>
        <Grid spacing={1}>
          <Grid container className={classes.header}>
            <Typography variant="h5">Sign Up</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.body}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit} className="white">
              <Grid item xs>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  type="text"
                  label="First Name"
                  id="firstName"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  type="text"
                  label="Last Name"
                  id="lastName"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  type="number"
                  label="Order Pin"
                  id="orderPin"
                  onChange={this.handleChange}
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
