import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
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
      </BrowserRouter>
    );
  }
}

export default App;
