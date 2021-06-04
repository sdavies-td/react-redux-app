import React, { Component } from "react";
import OrderList from "../orders/OrderList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Loader from "../layout/Loader";

const styles = (theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "Medium",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
});

class OrdersDashboard extends Component {
  render() {
    const { orders, auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (orders) {
      return (
        <Grid className={classes.root}>
          <Grid container className={classes.header}>
            <Typography className={classes.title}>Customer Orders</Typography>
            <IconButton color="primary" component={Link} to="/orders/create">
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid container className={classes.body}>
            <OrderList orders={orders} />
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
    orders: state.firestore.ordered.orders,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "orders" }]),
  withStyles(styles, { withTheme: true })
)(OrdersDashboard);
