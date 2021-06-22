import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const StoreAutocomplete = (props) => {
  const { stores, handleChange } = props;
  return (
    <Autocomplete
      id="store"
      onChange={handleChange}
      options={stores}
      renderOption={(store) => store.name}
      getOptionLabel={(store) => store.name}
      renderInput={(params) => (
        <TextField {...params} label="Store" placeholder="Search.." required />
      )}
    />
  );
};
export default StoreAutocomplete;
