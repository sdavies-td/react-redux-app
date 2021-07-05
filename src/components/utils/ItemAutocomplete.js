import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ItemAutocomplete = (props) => {
  const { items, handleChange, item } = props;
  let defaultValue;
  let newArray;
  let index;
  if (item && items) {
    console.log(item);
    index = items.findIndex((x) => x.id === item.id);
    if (index === -1) {
      newArray = items.concat(item);
      defaultValue = newArray[newArray.length - 1];
    } else {
      newArray = items;
      defaultValue = newArray[index];
    }
  } else {
    defaultValue = null;
    newArray = items;
  }

  if (typeof defaultValue !== "undefined") {
    return (
      <Autocomplete
        id="item"
        autoSelect
        onChange={handleChange}
        disableClearable
        options={items}
        renderOption={(x) => x.name}
        getOptionLabel={(x) => x.name}
        renderInput={(params) => (
          <TextField {...params} label="Item" placeholder="Search.." required />
        )}
      />
    );
  }
};

export default ItemAutocomplete;
