import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CustomerAutocomplete = (props) => {
  const { customers, handleChange } = props;
  return (
    <Autocomplete
      id="customer"
      autoSelect
      onChange={handleChange}
      disableClearable
      options={customers}
      renderOption={(customer) => customer.fullName}
      getOptionLabel={(customer) => customer.fullName}
      renderInput={(params) => (
        <TextField {...params} label="Customer" placeholder="Search.." />
      )}
    />
  );
};

export default CustomerAutocomplete;
