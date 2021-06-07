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
    },
  ]);
  const handleListChange = (e, i) => {
    const str = e.target.id;
    const value = e.target.innerHTML;
    const id = str.substring(0, str.indexOf("-"));
    const list = [...inputList];
    list[i][id] = value;
    setInputList(list);
    props.handleItems(inputList);
  };
  const handleQtyChange = (e, i) => {
    const { id, value } = e.target;
    const list = [...inputList];
    list[i][id] = value;
    setInputList(list);
    props.handleItems(inputList);
  };
  const handleAddInput = () => {
    setInputList([
      ...inputList,
      { itemName: "", itemSupplier: "", itemQty: null },
    ]);
  };
  const handleRemoveInput = (i) => {
    const list = [...inputList];
    list.splice(i, 1);
    setInputList(list);
  };
  const { items, classes } = props;
  return (
    <div>
      <Grid className={classes.subHeader}>
        <Typography className={classes.subTitle}>Add Order Items</Typography>
      </Grid>
      {inputList.map((x, i) => {
        return (
          <Grid key={i} className={classes.row}>
            <Grid className={classes.item}>
              <Autocomplete
                id="itemName"
                autoSelect
                disableClearable
                options={items}
                onChange={(e) => handleListChange(e, i)}
                renderOption={(item) => item.name}
                getOptionLabel={(item) => item.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Item Name"
                    placeholder="Search.."
                    value={x.itemName}
                  />
                )}
              />
            </Grid>
            <Grid className={classes.item}>
              <TextField
                id="itemSupplier"
                type="text"
                label="Supplier"
                value={x.itemSupplier}
                required
                onChange={(e) => handleListChange(e, i)}
              />
            </Grid>
            <Grid className={classes.item}>
              <TextField
                type="number"
                id="itemQty"
                label="Quantity"
                value={x.itemQty}
                required
                onChange={(e) => handleQtyChange(e, i)}
              />
            </Grid>
            <Grid className={classes.item}>
              {inputList.length !== 1 && (
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveInput(i)}
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

//<pre>JSON.stringify(inputList, null, 2)}</pre>
