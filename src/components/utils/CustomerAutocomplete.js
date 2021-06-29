import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CustomerAutocomplete = (props) => {
  const { handleChange, customer, customers } = props;
  let defaultValue;
  let newArray;
  let index;
  if (customer && customers) {
    index = customers.findIndex((x) => x.id === customer.id);
    if (index === -1) {
      newArray = customers.concat(customer);
      defaultValue = newArray[newArray.length - 1];
      //console.log("array added", defaultValue);
    } else {
      newArray = customers;
      defaultValue = newArray[index];
      //console.log("assigned defaultValue to correct object", newArray);
    }
  } else {
    defaultValue = null;
    newArray = customers;
    //console.log("array added not needed", newArray);
  }
  //console.log(newArray);
  return (
    <Autocomplete
      id="customer"
      autoSelect
      onChange={handleChange}
      disableClearable
      defaultValue={defaultValue}
      options={newArray}
      getOptionSelected={(x, defaultValue) =>
        x.fullName === defaultValue.fullName
      }
      renderOption={(x) => x.fullName}
      getOptionLabel={(x) => x.fullName}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Customer"
          placeholder="Search.."
          required
        />
      )}
    />
  );
};

export default CustomerAutocomplete;
