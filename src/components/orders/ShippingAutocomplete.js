import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ShippingAutocomplete = (props) => {
  const { handleShipping } = props;
  //const { handleShipping } = props;
  const shippingMethods = [
    { method: "Delivery", price: 15 },
    { method: "Pick-up", price: 0 },
  ];

  return (
    <Autocomplete
      id="shipping"
      disableClearable
      options={shippingMethods}
      onChange={handleShipping}
      renderOption={(option) => option.method}
      getOptionLabel={(option) => option.method}
      getOptionSelected={(option) => option.method}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Shipping"
          placeholder="Search.."
          required
        />
      )}
    />
  );
};

export default ShippingAutocomplete;
