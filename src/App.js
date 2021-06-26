import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

import CustomersDashboard from "./components/customers/CustomersDashboard";
import CreateCustomer from "./components/customers/CreateCustomer";
import EditCustomer from "./components/customers/EditCustomer";

import ItemsDashboard from "./components/items/ItemsDashboard";
import CreateItem from "./components/items/CreateItem";
import EditItem from "./components/items/EditItem";

import OrdersDashboard from "./components/orders/OrdersDashboard";
import CreateOrder from "./components/orders/CreateOrder";
import EditOrder from "./components/orders/EditOrder";

import StoresDashboard from "./components/stores/StoresDashboard";
import CreateStore from "./components/stores/CreateStore";
import EditStore from "./components/stores/EditStore";

import { Grid, Typography } from "@material-ui/core";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { themeStyles } from "./theme";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => themeStyles;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.state = {
      variant: {
        orders: "outlined",
        items: "outlined",
        customers: "outlined",
        stores: "outlined",
        profile: "outlined",
      },
      color: {
        orders: "default",
        items: "default",
        customers: "default",
        stores: "default",
        profile: "default",
      },
    };
  }
  handleLoad(e) {
    const id = e.target.textContent.toLowerCase();
    this.setState({
      variant: {
        orders: "outlined",
        items: "outlined",
        customers: "outlined",
        stores: "outlined",
        profile: "outlined",
      },
      color: {
        orders: "default",
        items: "default",
        customers: "default",
        stores: "default",
        profile: "default",
      },
    });
    this.setState((prevState) => ({
      variant: {
        ...prevState.variant,
        [id]: "contained",
      },
      color: {
        ...prevState.color,
        [id]: "primary",
      },
    }));
  }

  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar handleLoad={this.handleLoad} state={this.state} />
          <ToastContainer />
          <Switch>
            <Route exact path="/items" component={ItemsDashboard} />
            <Route path="/items/edit/:id" component={EditItem} />
            <Route path="/items/create" component={CreateItem} />
            <Route exact path="/customers" component={CustomersDashboard} />
            <Route path="/customers/edit/:id" component={EditCustomer} />
            <Route path="/customers/create" component={CreateCustomer} />
            <Route exact path="/orders" component={OrdersDashboard} />
            <Route path="/orders/edit/:id" component={EditOrder} />
            <Route path="/orders/create" component={CreateOrder} />
            <Route exact path="/stores" component={StoresDashboard} />
            <Route path="/stores/edit/:id" component={EditStore} />
            <Route path="/stores/create" component={CreateStore} />
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
            <Route exact path="/">
              <Redirect to="/orders" />
            </Route>
          </Switch>
        </div>
        <Grid className={classes.footerRow}>
          <Grid className={classes.footerItem}>
            <Typography>Project Kitchens © 2021. Made by</Typography>
          </Grid>
          <Grid className={classes.footerItem}>
            <NavLink
              to={{
                pathname: "https://www.techdigital.co.nz/",
              }}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography>Tech Digital.</Typography>
            </NavLink>
          </Grid>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
