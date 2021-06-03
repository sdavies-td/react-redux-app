import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ItemAutocomplete = (props) => {
  const { items, handleChange } = props;
  return (
    <Autocomplete
      id="item"
      autoSelect
      onChange={handleChange}
      disableClearable
      options={items}
      renderOption={(item) => item.name}
      getOptionLabel={(item) => item.name}
      renderInput={(params) => (
        <TextField {...params} required label="Item" placeholder="Search.." />
      )}
    />
  );
};

export default ItemAutocomplete;
