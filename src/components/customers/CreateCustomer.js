import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createCustomer } from "../../store/actions/customerActions";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "Medium",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    width: "400px",
  },
  button: {
    marginTop: "40px",
    justifyContent: "center",
    display: "flex",
  },
  item: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  buttonRow: {
    marginLeft: "20px",
    marginRight: "20px",
  },
});

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
    const { auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <Grid className={classes.root}>
        <Grid className={classes.header}>
          <Typography className={classes.title}>Create a Customer</Typography>
        </Grid>
        <Grid container className={classes.body}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit} className="white">
              <Grid className={classes.item}>
                <TextField
                  id="firstName"
                  label="First Name"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="phone"
                  label="Phone"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="address"
                  label="Address"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.button}>
                <Grid className={classes.buttonRow}>
                  <Button
                    onClick={this.handleCancel}
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    to="/customers"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid className={classes.buttonRow}>
                  <Button type="submit" variant="outlined" color="primary">
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(CreateCustomer);
