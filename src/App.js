import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

import CustomersDashboard from "./components/customers/CustomersDashboard";
import CreateCustomer from "./components/customers/CreateCustomer";
import EditCustomer from "./components/customers/EditCustomer";

import ItemsDashboard from "./components/items/ItemsDashboard";
import CreateItem from "./components/items/CreateItem";
import EditItem from "./components/items/EditItem";

import OrdersDashboard from "./components/orders/OrdersDashboard";
import CreateOrder from "./components/orders/CreateOrder";
import EditOrder from "./components/orders/EditOrder";
import ViewOrder from "./components/orders/ViewOrder";

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
  // //<pre>{JSON.stringify(this.state, null, 2)}</pre>
  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
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
            <Route path="/orders/view/:id" component={ViewOrder} />
            <Route exact path="/stores" component={StoresDashboard} />
            <Route path="/stores/edit/:id" component={EditStore} />
            <Route path="/stores/create" component={CreateStore} />
            <Route exact path="/">
              <Redirect to="/auth" />
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
              className={classes.link}
            >
              <Typography>Tech Digital Ltd.</Typography>
            </NavLink>
          </Grid>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
