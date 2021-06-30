import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { editCustomer } from "../../store/actions/customerActions";
import { withStyles } from "@material-ui/core/styles";
import Places from "../utils/Places";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import Loader from "../utils/Loader";

import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class EditCustomer extends Component {
  state = {
    customerId: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    address: null,
  };
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.id]: value,
    });
  };
  handleSubmit = (e) => {
    this.setState(
      {
        fullName: this.state.firstName + " " + this.state.lastName,
      },
      () => {
        e.preventDefault();
        this.props.editCustomer(this.state);
        this.props.history.push("/customers");
      }
    );
  };
  handleAddress = (e) => {
    if (e) {
      this.setState({
        address: e.description,
      });
    }
  };
  render() {
    const { auth, classes, customers, id } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (customers) {
      const customer = customers.find((x) => x.id === id);
      const { fullName, firstName, lastName, email, phone, address } = customer;
      if (this.state.customerId === null) {
        this.setState({
          customerId: id,
        });
      }
      if (this.state.firstName === null) {
        this.setState({
          firstName,
        });
      }
      if (this.state.lastName === null) {
        this.setState({
          lastName,
        });
      }
      if (this.state.email === null) {
        this.setState({
          email,
        });
      }
      if (this.state.phone === null) {
        this.setState({
          phone,
        });
      }
      if (this.state.address === null) {
        this.setState({
          address,
        });
      }
      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>
              Edit Customer: {fullName}
            </Typography>
          </Grid>
          <Grid className={classes.body}>
            <Paper className={classes.paper}>
              <form onSubmit={this.handleSubmit}>
                <Grid className={classes.item}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    onChange={this.handleChange}
                    required
                    defaultValue={firstName}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    onChange={this.handleChange}
                    required
                    defaultValue={lastName}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    onChange={this.handleChange}
                    required
                    defaultValue={email}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <TextField
                    id="phone"
                    label="Phone"
                    type="text"
                    fullWidth
                    onChange={this.handleChange}
                    required
                    defaultValue={phone}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <Places
                    defaultValue={address}
                    handleAddress={this.handleAddress}
                  />
                </Grid>
                <Grid className={classes.buttonRow}>
                  <Grid className={classes.buttonItem}>
                    <Button
                      onClick={this.handleCancel}
                      variant="outlined"
                      color="secondary"
                      component={Link}
                      to="/customers"
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid className={classes.buttonItem}>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      fullWidth
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      );
    } else {
      return <Loader />;
    }
  }
}
// <pre>{JSON.stringify(this.state, null, 2)}</pre>

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const customers = state.firestore.ordered.customers;
  return {
    auth: state.firebase.auth,
    customers,
    id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCustomer: (customer) => dispatch(editCustomer(customer)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "customers" }]),
  withStyles(styles, { withTheme: true })
)(EditCustomer);
