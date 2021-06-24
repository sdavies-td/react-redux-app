import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

import CustomersDashboard from "./components/customers/CustomersDashboard";
import CreateCustomer from "./components/customers/CreateCustomer";
//import EditCustomer from "./components/customers/EditCustomer";

import ItemsDashboard from "./components/items/ItemsDashboard";
import CreateItem from "./components/items/CreateItem";
import EditItem from "./components/items/EditItem";

import OrdersDashboard from "./components/orders/OrdersDashboard";
import CreateOrder from "./components/orders/CreateOrder";
import EditOrder from "./components/orders/EditOrder";

import StoresDashboard from "./components/stores/StoresDashboard";
import CreateStore from "./components/stores/CreateStore";
//import EditStore from "./components/stores/EditStore";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.navLinks = {
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

  componentDidMount() {
    window.addEventListener("load", this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
  }

  handleLoad() {
    console.log("loaded");
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar handleLoad={this.handleLoad} navLinks={this.navLinks} />
          <ToastContainer />
          <Switch>
            <Route exact path="/items">
              <ItemsDashboard />
            </Route>
            <Route path="/items/edit/:id">
              <EditItem />
            </Route>
            <Route path="/items/create">
              <CreateItem />
            </Route>
            <Route exact path="/customers">
              <CustomersDashboard />
            </Route>
            <Route path="/customers/edit/:id"></Route>
            <Route path="/customers/create">
              <CreateCustomer />
            </Route>
            <Route exact path="/orders">
              <OrdersDashboard />
            </Route>
            <Route path="/orders/edit/:id">
              <EditOrder />
            </Route>
            <Route path="/orders/create">
              <CreateOrder />
            </Route>
            <Route exact path="/stores">
              <StoresDashboard />
            </Route>
            <Route path="/stores/edit/:id"></Route>
            <Route path="/stores/create">
              <CreateStore />
            </Route>
            <Route path="/auth/signin">
              <SignIn />
            </Route>
            <Route path="/auth/signup">
              <SignUp />
            </Route>
            <Route exact path="/">
              <Redirect to="/orders" />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
