import React, { useState } from "react";
import { TextField, IconButton, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LinkIcon from "@material-ui/icons/Link";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

function OrderItems(props) {
  const [inputList, setInputList] = useState([
    {
      itemName: "",
      supplierName: "",
      itemPrice: 0,
      itemQty: 0,
      itemSubtotal: 0,
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
    handleSubtotal(i);
    setInputList(list);
    props.handleItems(list);
  };
  const handleQtyChange = (e, i) => {
    const { value } = e.target;
    const list = [...inputList];
    if (e.target.value === "") {
      list[i].itemQty = 0;
      handleSubtotal(i);
      setInputList(list);
      props.handleItems(list);
    } else {
      list[i].itemQty = parseInt(value);
      handleSubtotal(i);
      setInputList(list);
      props.handleItems(list);
    }
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
        itemPrice: 0,
        itemQty: 0,
        itemSubtotal: 0,
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
          <Grid key={i} className={classes.itemRow}>
            <Grid className={classes.name}>
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
                    value={inputList[i].item}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid className={classes.qty}>
              <TextField
                id="itemQty"
                type="number"
                label="Qty"
                required
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                value={inputList[i].itemQty}
                onChange={(e) => handleQtyChange(e, i)}
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.supplier}>
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
                disabled
              />
            </Grid>
            <Grid className={classes.link}>
              <Link
                to={{
                  pathname: inputList[i].itemLink,
                }}
                target="_blank"
              >
                <IconButton>
                  <LinkIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid className={classes.price}>
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
                disabled
              />
            </Grid>
            <Grid className={classes.itemSubtotal}>
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
                disabled
              />
            </Grid>
            <Grid className={classes.itemAddRemove}>
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
