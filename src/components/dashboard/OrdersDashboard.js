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

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
});

class OrdersDashboard extends Component {
  render() {
    const { orders, auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="h5">Customer Orders</Typography>
          <IconButton color="primary" component={Link} to="/orders/create">
            <AddCircleIcon />
          </IconButton>
        </Grid>
        <OrderList orders={orders} />
      </div>
    );
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
