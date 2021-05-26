import React, { Component } from "react";
import { connect } from "react-redux";
import { createItem } from "../../store/actions/itemActions";
import { Redirect } from "react-router-dom";

class CreateItem extends Component {
  state = {
    itemName: "",
    supplierName: "",
    supplierInfo: { supplierPrice: null, supplierLink: "" },
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSuppliers = (e) => {
    this.setState((prevState) => ({
      supplierInfo: {
        ...prevState.supplierInfo,
        [e.target.id]: e.target.value,
      },
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createItem(this.state);
    this.props.history.push("/items");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darker-3">Create Item</h5>
          <div className="input-field">
            <label htmlFor="itemName">Item Name</label>
            <input type="text" id="itemName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="supplierName">Supplier Name</label>
            <input type="text" id="supplierName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="supplierPrice">
              Supplier Price (Including GST)
            </label>
            <input
              type="number"
              min="1"
              step="any"
              id="supplierPrice"
              onChange={this.handleSuppliers}
            />
          </div>
          <div className="input-field">
            <label htmlFor="supplierLink">Suppliers link to item</label>
            <input
              type="text"
              id="supplierLink"
              onChange={this.handleSuppliers}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    items: state.firestore.ordered.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createItem: (item) => dispatch(createItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);
