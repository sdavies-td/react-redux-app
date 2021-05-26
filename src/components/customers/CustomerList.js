import React, { useState } from "react";
import CustomerSummary from "./CustomerSummary";
import { Link } from "react-router-dom";

const CustomerList = ({ customers }) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event);
  };
  return (
    <div className="customer-list section">
      <div className="input-field">
        <input
          id="search"
          type="search"
          value={value}
          onChange={handleChange}
        />
        <label className="label-icon" htmlFor="search">
          <i className="material-icons">search</i>
        </label>
        <i className="material-icons">close</i>
      </div>
      {customers &&
        customers
          .filter((customer) => {
            if (value === "") {
              return customer;
            } else if (
              customer.fullName.toLowerCase().includes(value.toLowerCase())
            ) {
              return customer;
            }
            return null;
          })
          .map((customer) => {
            return (
              <Link to={"/customers/customer/" + customer.id} key={customer.id}>
                <CustomerSummary customer={customer} />
              </Link>
            );
          })}
    </div>
  );
};

export default CustomerList;
