/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { createOrder } from "../../store/actions/orderActions";
import { Redirect } from "react-router-dom";
import OrderItems from "./OrderItems";
import CustomerAutocomplete from "./CustomerAutocomplete";
import StoreAutocomplete from "./StoreAutocomplete";
import ShippingAutocomplete from "./ShippingAutocomplete";
import MaterialUIPickers from "./DatePicker";
import moment from "moment";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
  subTitle: {
    marginTop: "40px",
    marginBottom: "20px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(8),
    margin: theme.spacing(4),
  },
  button: {
    marginTop: "100px",
    justifyContent: "center",
    display: "flex",
  },
  buttonRow: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  row: {
    display: "flex",
  },
  item: {
    width: "150px",
    marginLeft: "20px",
    marginRight: "20px",
  },
});

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
    orderItems: [],
  };
  handleChange(e, value) {
    const str = e.target.id;
    const id = str.substring(0, str.indexOf("-"));
    const { createdAt, createdById, createdByName, ...store } = value;
    this.setState(
      {
        [id]: store,
      },
      () => {
        //console.log(this.state.orderItems);
      }
    );
  }
  handleItems(list) {
    this.setState(
      {
        orderItems: list,
      },
      () => {
        //console.log(this.state.orderItems);
      }
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createOrder(this.state);
    this.props.history.push("/orders");
    //console.log(this.state);
  };
  handleDate = (e) => {
    const date = moment(e).format("DD/MM/YYYY");
    //console.log(date);
    this.setState(
      {
        orderDate: date,
      },
      () => {
        //console.log(this.state);
      }
    );
  };
  handleShipping = (e, value) => {
    //console.log(e);
    this.setState(
      {
        shipping: value,
      },
      () => {
        //console.log(this.state);
      }
    );
  };
  render() {
    const { auth, stores, customers, classes, items } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <Grid className={classes.root}>
        <Grid className={classes.header}>
          <Typography className={classes.title}>Create an Order</Typography>
        </Grid>
        <Grid container className={classes.body}>
          <Paper className={classes.paper}>
            <form
              noValidate
              onSubmit={this.handleSubmit}
              className={classes.container}
            >
              <Grid className={classes.row}>
                <Grid className={classes.item}>
                  <MaterialUIPickers handleDate={this.handleDate} />
                </Grid>
                <Grid className={classes.item}>
                  <StoreAutocomplete
                    id="store"
                    stores={stores}
                    handleChange={this.handleChange}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <CustomerAutocomplete
                    customers={customers}
                    handleChange={this.handleChange}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <ShippingAutocomplete handleChange={this.handleChange} />
                </Grid>
              </Grid>
              <OrderItems
                classes={classes}
                items={items}
                handleItems={this.handleItems}
              />
              <Grid className={classes.button}>
                <Grid className={classes.buttonRow}>
                  <Button
                    onClick={this.handleCancel}
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    to="/orders"
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
  const db = state.firestore.ordered;
  //console.log(ownProps);
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
