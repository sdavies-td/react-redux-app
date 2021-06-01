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
import { Grid, Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(4),
    margin: theme.spacing(2),
  },
  title: {
    textAlign: "center",
  },
});

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
    this.setState(
      {
        [id]: value,
      },
      () => {
        //console.log(this.state);
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
    const { auth, stores, customers, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    //console.log(this.state);
    return (
      <div className={classes.root}>
        <Grid spacing={1}>
          <Grid className={classes.title} item xs={12}>
            <Typography variant="h5">Create Order</Typography>
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <form
            noValidate
            className={classes.container}
            onSubmit={this.handleSubmit}
          >
            <Grid container spacing={5}>
              <Grid item xs>
                <MaterialUIPickers handleDate={this.handleDate} />
              </Grid>
              <Grid item xs>
                <StoreAutocomplete
                  id="store"
                  stores={stores}
                  handleChange={this.handleChange}
                />
              </Grid>
              <Grid item xs>
                <CustomerAutocomplete
                  customers={customers}
                  handleChange={this.handleChange}
                />
              </Grid>
              <Grid item xs>
                <ShippingAutocomplete handleShipping={this.handleShipping} />
              </Grid>
            </Grid>
            <OrderItems />
            <div>
              <button>Create</button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const db = state.firestore.ordered;
  //console.log(db.suppliers);
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
