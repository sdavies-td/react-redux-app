import React, { Component } from "react";
import OrderList from "./OrderList";
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

class OrdersDashboard extends Component {
  render() {
    const { orders, auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (orders) {
      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>Customer Orders</Typography>
            <IconButton color="primary" component={Link} to="/orders/create">
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid className={classes.body}>
            <OrderList orders={orders} classes={classes} />
          </Grid>
        </Grid>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state) => {
  const orders = state.firestore.ordered.orders;
  const auth = state.firebase.auth;
  return {
    orders,
    auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "orders" }]),
  withStyles(styles, { withTheme: true })
)(OrdersDashboard);
