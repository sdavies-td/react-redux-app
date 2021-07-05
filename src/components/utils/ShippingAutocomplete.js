import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ShippingAutocomplete = (props) => {
  const { handleChange, shipping } = props;
  //const { handleShipping } = props;
  const shippingMethods = [
    { method: "Delivery", price: 15 },
    { method: "Pick-up", price: 0 },
  ];
  let defaultValue;
  let newArray;
  let index;

  if (shipping) {
    index = shippingMethods.findIndex((x) => x.method === shipping.method);
    if (index === -1) {
      newArray = shippingMethods.concat(shipping);
      defaultValue = newArray[newArray.length - 1];
    } else {
      newArray = shippingMethods;
      defaultValue = newArray[index];
    }
  } else {
    defaultValue = null;
    newArray = shippingMethods;
  }
  if (typeof defaultValue !== "undefined") {
    return (
      <Autocomplete
        id="shipping"
        disableClearable
        options={shippingMethods}
        onChange={handleChange}
        defaultValue={defaultValue}
        getOptionSelected={(x, defaultValue) =>
          x.method === defaultValue.method
        }
        renderOption={(x) => x.method}
        getOptionLabel={(x) => x.method}
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
  }
};

export default ShippingAutocomplete;
