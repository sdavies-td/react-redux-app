import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const StoreAutocomplete = (props) => {
  const { handleChange, store, stores } = props;
  let defaultValue;
  let newArray;
  let index;
  if (store && stores) {
    index = stores.findIndex((x) => x.id === store.id);
    if (index === -1) {
      newArray = stores.concat(store);
      defaultValue = newArray[newArray.length - 1];
      //console.log("array added", defaultValue);
    } else {
      newArray = stores;
      defaultValue = newArray[index];
      //console.log("assigned defaultValue to correct object", newArray);
    }
  } else {
    defaultValue = null;
    newArray = stores;
    //console.log("array added not needed", newArray);
  }
  if (typeof defaultValue !== "undefined") {
    return (
      <Autocomplete
        id="store"
        autoSelect
        onChange={handleChange}
        disableClearable
        defaultValue={defaultValue}
        options={newArray}
        getOptionSelected={(x, defaultValue) => x.name === defaultValue.name}
        renderOption={(x) => x.name}
        getOptionLabel={(x) => x.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Store"
            placeholder="Search.."
            required
          />
        )}
      />
    );
  }
};

export default StoreAutocomplete;
