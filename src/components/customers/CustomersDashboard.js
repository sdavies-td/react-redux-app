import React, { Component } from "react";
import CustomerList from "./CustomerList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Loader from "../utils/Loader";

import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class CustomersDashboard extends Component {
  render() {
    const { customers, auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (customers) {
      return (
        <Grid className={classes.root}>
          <Grid container className={classes.header}>
            <Typography className={classes.title}>Customers</Typography>
            <IconButton color="primary" component={Link} to="/customers/create">
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid container className={classes.body}>
            <CustomerList customers={customers} />
          </Grid>
        </Grid>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.firestore.ordered.customers,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "customers" }]),
  withStyles(styles, { withTheme: true })
)(CustomersDashboard);
