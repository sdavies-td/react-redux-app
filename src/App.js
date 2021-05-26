import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CustomersDashboard from "./components/dashboard/CustomersDashboard";
import CustomerDetails from "./components/customers/CustomerDetails";
import CreateCustomer from "./components/customers/CreateCustomer";
import ItemsDashboard from "./components/dashboard/ItemsDashboard";
import ItemDetails from "./components/items/ItemDetails";
import CreateItem from "./components/items/CreateItem";
import EditSupplierItem from "./components/items/EditSupplierItem";
import OrdersDashboard from "./components/dashboard/OrdersDashboard";
import OrderDetails from "./components/orders/OrderDetails";
import CreateOrder from "./components/orders/CreateOrder";
import StoresDashboard from "./components/dashboard/StoresDashboard";
import StoreDetails from "./components/stores/StoreDetails";
import CreateStore from "./components/stores/CreateStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/items" component={ItemsDashboard} />
            <Route exact path="/items/view/:id" component={ItemDetails} />
            <Route
              path="/items/item/:id/suppliers/edit/:id"
              component={EditSupplierItem}
            />
            <Route path="/items/create" component={CreateItem} />
            <Route exact path="/customers" component={CustomersDashboard} />
            <Route path="/customers/view/:id" component={CustomerDetails} />
            <Route path="/customers/create" component={CreateCustomer} />
            <Route exact path="/orders" component={OrdersDashboard} />
            <Route path="/orders/view/:id" component={OrderDetails} />
            <Route path="/orders/create" component={CreateOrder} />
            <Route exact path="/stores" component={StoresDashboard} />
            <Route path="/stores/view/:id" component={StoreDetails} />
            <Route path="/stores/create" component={CreateStore} />
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
