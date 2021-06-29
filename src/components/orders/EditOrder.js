/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { editOrder } from "../../store/actions/orderActions";
import { Redirect } from "react-router-dom";
import OrderItems from "./OrderItems";
import CustomerAutocomplete from "../utils/CustomerAutocomplete";
import StoreAutocomplete from "../utils/StoreAutocomplete";
import ShippingAutocomplete from "../utils/ShippingAutocomplete";
import MaterialUIPickers from "../utils/DatePicker";
import moment from "moment";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Loader from "../utils/Loader";

import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleItems = this.handleItems.bind(this);
  }
  state = {
    orderDate: null,
    store: null,
    customer: null,
    shipping: null,
    orderItems: null,
    orderTotal: {
      exclGst: null,
      gst: null,
      total: null,
    },
  };
  handleChange(e, value) {
    const str = e.target.id;
    const id = str.substring(0, str.indexOf("-"));
    const { createdAt, createdById, createdByName, ...store } = value;
    this.setState(
      {
        [id]: store,
      },
      () => {}
    );
  }
  handleItems(list) {
    this.setState(
      {
        orderItems: list,
      },
      () => {}
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editOrder(this.state);
    this.props.history.push("/orders");
  };
  handleDate = (e) => {
    const date = moment(e).format("DD/MM/YYYY");
    this.setState(
      {
        orderDate: date,
      },
      () => {}
    );
  };
  handleShipping = (e, value) => {
    this.setState(
      {
        shipping: value,
      },
      () => {}
    );
  };
  render() {
    const { auth, stores, customers, classes, items, orders, id } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    let order;
    if (orders && typeof order === "undefined") {
      const [, ...rest] = orders;
      order = rest.find((order) => order.id === id);
    }
    if (typeof order !== "undefined") {
      const { orderDate, customer, orderCount, store, orderItems } = order;
      if (this.state.orderDate === null) {
        this.setState({
          orderDate,
        });
      }
      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>
              Edit Order: {orderCount}
            </Typography>
          </Grid>
          <Grid className={classes.orderBody}>
            <Paper className={classes.orderPaper}>
              <form onSubmit={this.handleSubmit}>
                <Grid className={classes.row}>
                  <Grid className={classes.date}>
                    <MaterialUIPickers
                      handleDate={this.handleDate}
                      orderDate={orderDate}
                    />
                  </Grid>
                  <Grid className={classes.store}>
                    <StoreAutocomplete
                      id="store"
                      stores={stores}
                      handleChange={this.handleChange}
                      store={store}
                    />
                  </Grid>
                  <Grid className={classes.customer}>
                    <CustomerAutocomplete
                      customers={customers}
                      handleChange={this.handleChange}
                      customer={customer}
                    />
                  </Grid>
                  <Grid className={classes.shipping}>
                    <ShippingAutocomplete handleChange={this.handleChange} />
                  </Grid>
                </Grid>
                <OrderItems
                  classes={classes}
                  items={items}
                  handleItems={this.handleItems}
                  orderItems={orderItems}
                />
                <Grid className={classes.totalRow}>
                  <Grid className={classes.totalItems}>
                    <TextField
                      inputProps={{ min: 0, style: { textAlign: "right" } }}
                      id="gstExcl"
                      type="text"
                      value={Intl.NumberFormat("en-NZ", {
                        style: "currency",
                        currency: "NZD",
                      }).format(this.state.orderTotal.exclGst)}
                      label="Total Excl. GST"
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                  <Grid className={classes.totalItems}>
                    <TextField
                      inputProps={{ min: 0, style: { textAlign: "right" } }}
                      id="gst"
                      type="text"
                      value={Intl.NumberFormat("en-NZ", {
                        style: "currency",
                        currency: "NZD",
                      }).format(this.state.orderTotal.gst)}
                      label="GST Amount"
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                  <Grid className={classes.totalItems}>
                    <TextField
                      inputProps={{ min: 0, style: { textAlign: "right" } }}
                      id="total"
                      type="text"
                      value={Intl.NumberFormat("en-NZ", {
                        style: "currency",
                        currency: "NZD",
                      }).format(this.state.orderTotal.total)}
                      label="Total Incl. GST"
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.orderButtonRow}>
                  <Grid className={classes.buttonItem}>
                    <Button
                      onClick={this.handleCancel}
                      variant="outlined"
                      color="secondary"
                      component={Link}
                      to="/orders"
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

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const db = state.firestore.ordered;
  return {
    auth: state.firebase.auth,
    stores: db.stores,
    customers: db.customers,
    items: db.items,
    users: db.users,
    orders: db.orders,
    id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editOrder: (order) => dispatch(editOrder(order)),
  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "stores" },
    { collection: "customers" },
    { collection: "users" },
    { collection: "items" },
    { collection: "orders" },
  ]),
  withStyles(styles, { withTheme: true })
)(EditOrder);
