/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { createOrder } from "../../store/actions/orderActions";
import OrderItems from "./OrderItems";
import CustomerAutocomplete from "../utils/CustomerAutocomplete";
import StoreAutocomplete from "../utils/StoreAutocomplete";
import ShippingAutocomplete from "../utils/ShippingAutocomplete";
import MaterialUIPickers from "../utils/DatePicker";
import moment from "moment";
import { Grid, Typography, Paper, Button } from "@material-ui/core";

import { Link } from "react-router-dom";
import Loader from "../utils/Loader";

import { withStyles } from "@material-ui/core/styles";
import { themeStyles } from "../../theme";
const styles = (theme) => themeStyles;

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleItems = this.handleItems.bind(this);
  }
  state = {
    orderDate: moment(new Date()).format("DD/MM/YYYY"),
    store: "",
    customer: "",
    shipping: "",
    orderItems: [
      {
        itemName: "",
        supplierName: "",
        itemPrice: 0,
        itemQty: 0,
        itemSubtotal: 0,
      },
    ],
    orderTotal: {
      exclGst: 0,
      gst: 0,
      total: 0,
    },
  };
  handleChange(e, value) {
    const str = e.target.id;
    const id = str.substring(0, str.indexOf("-"));
    const {
      createdAt,
      createdById,
      createdByName,
      editedLastById,
      editedLastByName,
      editedLastAt,
      ...rest
    } = value;
    this.setState(
      {
        [id]: rest,
      },
      () => {}
    );
  }
  handleItems(items, total) {
    this.setState({
      orderItems: items,
      orderTotal: total,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createOrder(this.state);
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
    const { stores, customers, classes, items } = this.props;
    if (items && stores && customers) {
      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>Create an Order</Typography>
          </Grid>
          <Grid className={classes.orderBody}>
            <Paper className={classes.orderPaper}>
              <form onSubmit={this.handleSubmit}>
                <Grid className={classes.row}>
                  <Grid className={classes.date}>
                    <MaterialUIPickers handleDate={this.handleDate} />
                  </Grid>
                  <Grid className={classes.store}>
                    <StoreAutocomplete
                      id="store"
                      stores={stores}
                      handleChange={this.handleChange}
                    />
                  </Grid>
                  <Grid className={classes.customer}>
                    <CustomerAutocomplete
                      customers={customers}
                      handleChange={this.handleChange}
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
                />
                <Grid className={classes.buttonRow}>
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
                      Create
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
//<pre>{JSON.stringify(this.state, null, 2)}</pre>
const mapStateToProps = (state) => {
  const db = state.firestore.ordered;
  return {
    auth: state.firebase.auth,
    stores: db.stores,
    customers: db.customers,
    items: db.items,
    users: db.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (order) => dispatch(createOrder(order)),
  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "stores" },
    { collection: "customers" },
    { collection: "users" },
    { collection: "items" },
  ]),
  withStyles(styles, { withTheme: true })
)(CreateOrder);
