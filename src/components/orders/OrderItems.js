import React, { useState } from "react";
import { TextField, IconButton, Grid, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

function OrderItems(props) {
  const [inputList, setInputList] = useState([
    {
      itemName: "",
      itemSupplier: "",
      itemQty: null,
      itemPrice: null,
    },
  ]);

  const handleListChange = (e, i) => {
    // const { name, value } = e;
    // console.log(e);
    const str = e.target.id;
    const value = e.target.innerHTML;
    const id = str.substring(0, str.indexOf("-"));
    const list = [...inputList];
    list[i][id] = value;
    setInputList(list);
    props.handleItems(inputList);
  };

  const handleQtyChange = (e, i) => {
    const { name, value } = e.target;

    const list = [...inputList];

    list[i][name] = parseInt(value);

    setInputList(list);
    props.handleItems(list);
  };

  const handleAddInput = () => {
    setInputList([
      ...inputList,
      { itemName: "", itemSupplier: "", itemQty: null },
    ]);
  };

  const handleRemoveInput = (e, i) => {
    const list = [...inputList];
    //console.log(i);
    list.splice(i, 1);
    setInputList(list);
  };
  //console.log(props);
  const { items, classes } = props;
  return (
    <div>
      <Grid spacing={1}>
        <Grid className={classes.title} item xs={12}>
          <Typography variant="h6">Add Order Items</Typography>
        </Grid>
      </Grid>
      {inputList.map((item, i) => {
        return (
          <Grid key={i} container spacing={4}>
            <Grid item xs>
              <Autocomplete
                id="itemName"
                autoSelect
                onChange={(e) => handleListChange(e, i)}
                disableClearable
                options={items}
                renderOption={(item) => item.name}
                getOptionLabel={(item) => item.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Item Name"
                    placeholder="Search.."
                    value={item.itemName}
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="itemSupplier"
                type="text"
                label="Supplier"
                value={item.itemSupplier}
                fullWidth
                onChange={(e) => handleListChange(e, i)}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="number"
                id="itemQty"
                label="Quantity"
                value={item.itemQty}
                fullWidth
                onChange={(e) => handleQtyChange(e, i)}
              />
            </Grid>
            <Grid item xs>
              {inputList.length !== 1 && (
                <IconButton
                  color="secondary"
                  onClick={(e) => handleRemoveInput(e, i)}
                >
                  <RemoveCircleIcon />
                </IconButton>
              )}
              {inputList.length - 1 === i && (
                <IconButton color="primary" onClick={handleAddInput}>
                  <AddCircleIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default OrderItems;
