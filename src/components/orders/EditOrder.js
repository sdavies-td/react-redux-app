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
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Loader from "../utils/Loader";
import _ from "lodash";
import EditOrderDialog from "./EditOrderDialog";

import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleItems = this.handleItems.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editDisabled = null;
  }
  state = {
    beforeChange: {},
    proposedChange: {},
    boolean: {
      setOpen: false,
    },
  };
  handleChange(e, value) {
    const str = e.target.id;
    const i = str.substring(0, str.indexOf("-"));
    const {
      editedLastById,
      editedLastAt,
      createdAt,
      createdByName,
      createdById,
      editedLastByName,
      ...rest
    } = value;
    this.setState(
      {
        proposedChange: { ...this.state.proposedChange, [i]: rest },
      },
      () => {}
    );
    this.handleDisabledButton();
  }
  handleItems(items, total) {
    if (!_.isEmpty(this.state.proposedChange)) {
      this.setState({
        ...this.state,
        proposedChange: {
          ...this.state.proposedChange,
          orderItems: items,
          orderTotal: total,
        },
      });
      this.handleDisabledButton();
    }
  }
  handleSubmit = (e) => {
    //e.preventDefault();
    this.props.editOrder(this.state.proposedChange);
    this.props.history.push("/orders");
  };
  handleDate = (e) => {
    const date = moment(e).format("DD/MM/YYYY");
    this.setState({
      proposedChange: { ...this.state.proposedChange, orderDate: date },
    });
    this.handleDisabledButton();
  };
  handleShipping = (e, value) => {
    this.setState({
      proposedChange: { ...this.state.proposedChange, shipping: value },
    });
    this.handleDisabledButton();
  };
  handleDialogOpen = () => {
    this.setState({ boolean: { ...this.state.boolean, setOpen: true } });
  };
  handleDialogClose = () => {
    this.setState({ boolean: { ...this.state.boolean, setOpen: false } });
  };
  handleDisabledButton = () => {
    if (
      _.isEqual(this.state.beforeChange, this.state.proposedChange) &&
      !_.isEmpty(this.state.proposedChange)
    ) {
      this.editDisabled = true;
    } else {
      this.editDisabled = false;
    }
  };
  render() {
    const { auth, stores, customers, classes, items, orders, id } = this.props;
    const { beforeChange, proposedChange, boolean } = this.state;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (stores && customers && classes && items && orders && id) {
      const [, ...rest] = orders;
      const tempOrder = rest.find((x) => x.id === id);
      const {
        editedLastById,
        editedLastByName,
        editedLastAt,
        createdByName,
        createdById,
        createdAt,
        status,
        ...order
      } = tempOrder;
      const {
        orderCount,
        orderDate,
        customer,
        store,
        orderItems,
        shipping,
        orderTotal,
      } = order;

      if (_.isEmpty(beforeChange)) {
        this.setState({ ...this.state, beforeChange: order }, () => {});
      }
      if (_.isEmpty(proposedChange)) {
        this.setState({ ...this.state, proposedChange: order }, () => {});
      }
      if (
        _.isEqual(beforeChange, proposedChange) &&
        !_.isEmpty(proposedChange)
      ) {
        this.editDisabled = true;
      } else {
        this.editDisabled = false;
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
                    <ShippingAutocomplete
                      handleChange={this.handleChange}
                      shipping={shipping}
                    />
                  </Grid>
                </Grid>
                <OrderItems
                  classes={classes}
                  items={items}
                  handleItems={this.handleItems}
                  orderItems={orderItems}
                  orderTotal={orderTotal}
                />
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
                      //type="submit"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled={this.editDisabled}
                      onClick={() => {
                        //this.getObjectDiff(order, this.state);
                        this.handleDialogOpen();
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
            <EditOrderDialog
              classes={classes}
              beforeChange={beforeChange}
              proposedChange={proposedChange}
              boolean={boolean.setOpen}
              handleClose={this.handleDialogClose}
              handleSubmit={this.handleSubmit}
            />
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
