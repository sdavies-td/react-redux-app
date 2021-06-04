import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
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

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { auth, classes } = this.props;
    if (auth.uid) return <Redirect to="/orders" />;
    return (
      <div className={classes.root}>
        <Grid spacing={1}>
          <Grid container className={classes.header}>
            <Typography variant="h5">Sign In</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.body}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit} className={classes.form}>
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
              <Grid item xs className={classes.button}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  Sign In
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
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(SignIn);
