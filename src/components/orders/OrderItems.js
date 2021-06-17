import React, { useState } from "react";
import { TextField, IconButton, Grid, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

function OrderItems(props) {
  const [inputList, setInputList] = useState([
    {
      itemName: "",
      supplierName: "",
      itemPrice: null,
      itemQty: 0,
      itemSubtotal: null,
    },
  ]);
  const handleListChange = (e, i, item) => {
    const {
      createdAt,
      createdById,
      createdByName,
      editedLastAt,
      editedLastById,
      editedLastByName,
      id,
      ...rest
    } = item;
    const list = [...inputList];
    list[i] = {
      ...rest,
      itemQty: 0,
      itemSubtotal: 0,
    };

    setInputList(list);
    props.handleItems(inputList);
  };
  const handleQtyChange = (e, i) => {
    const { value } = e.target;
    //console.log(id);
    const list = [...inputList];

    list[i].itemQty = parseInt(value);
    handleSubtotal(i);
    setInputList(list);
    props.handleItems(inputList);
  };
  const handleSubtotal = (i) => {
    const itemSubtotal = inputList[i].itemPrice * inputList[i].itemQty;
    const list = [...inputList];
    list[i].itemSubtotal = itemSubtotal;
    setInputList(list);
  };
  const handleAddInput = (i) => {
    const list = [
      ...inputList,
      {
        itemName: "",
        supplierName: "",
        itemPrice: null,
        itemQty: 0,
        itemSubtotal: null,
      },
    ];
    setInputList(list);
    props.handleItems(list);
  };
  const handleRemoveInput = (i) => {
    const list = [...inputList];
    list.splice(i, 1);
    setInputList(list);
    props.handleItems(list);
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
            <Grid className={classes.itemName}>
              <Autocomplete
                id="itemName"
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                autoSelect
                disableClearable
                options={items}
                onChange={(e, item) => handleListChange(e, i, item)}
                renderOption={(item) => item.itemName}
                getOptionLabel={(item) => item.itemName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    type
                    label="Item Name"
                    placeholder="Search.."
                    value={inputList[i].itemName}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid className={classes.itemSupplier}>
              <TextField
                id="supplierName"
                inputProps={{ min: 0, style: { textAlign: "left" } }}
                type="text"
                value={inputList[i].supplierName}
                label="Supplier"
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.itemPrice}>
              <TextField
                inputProps={{ min: 0, style: { textAlign: "right" } }}
                id="itemPrice"
                type="text"
                value={Intl.NumberFormat("en-NZ", {
                  style: "currency",
                  currency: "NZD",
                }).format(inputList[i].itemPrice)}
                label="Price"
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.itemQty}>
              <TextField
                type="number"
                id="itemQty"
                label="Qty"
                required
                inputProps={{ min: 0, style: { textAlign: "right" } }}
                value={inputList[i].itemQty}
                onChange={(e) => handleQtyChange(e, i)}
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.itemPrice}>
              <TextField
                inputProps={{ min: 0, style: { textAlign: "right" } }}
                id="itemSubtotal"
                type="text"
                value={Intl.NumberFormat("en-NZ", {
                  style: "currency",
                  currency: "NZD",
                }).format(inputList[i].itemSubtotal)}
                label="Subtotal"
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
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
                <IconButton color="primary" onClick={() => handleAddInput(i)}>
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

//<pre>{JSON.stringify(inputList, null, 2)}</pre>
