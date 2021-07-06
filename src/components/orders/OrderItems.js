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
      itemName: null,
      supplierName: "",
      itemPrice: null,
      itemQty: 0,
      itemSubtotal: null,
    },
  ]);
  const [orderTotal, setOrderTotal] = useState({
    orderTotal: {
      exclGst: null,
      gst: null,
      total: null,
    },
  });
  const handleListChange = (e, i, x) => {
    const list = [...inputList];
    const {
      editedLastByName,
      editedLastAt,
      gstExclusive,
      editedLastById,
      createdById,
      createdByName,
      createdAt,
      ...rest
    } = x;
    list[i] = {
      ...rest,
      itemQty: 0,
      itemSubtotal: 0,
    };
    setInputList(list);
    handleSubtotal(list, i);
    handleTotal(list);
  };
  const handleQtyChange = (e, i) => {
    let list;
    const { valueAsNumber } = e.target;
    const { ...rest } = inputList[i];
    if (isNaN(valueAsNumber)) {
      list = [...inputList];
      list[i] = {
        ...rest,
        itemQty: 0,
      };
    } else {
      list = [...inputList];
      list[i] = {
        ...rest,
        itemQty: valueAsNumber,
      };
    }
    setInputList(list);
    handleSubtotal(list, i);
    handleTotal(list);
  };
  const handleTotal = (list) => {
    const calculateTotal = list
      .map((x) => x.itemSubtotal)
      .reduce((prev, next) => prev + next);
    setInputList(list);
    const tempTotal = {
      orderTotal: {
        total:
          Math.round(((calculateTotal * 3) / 23) * 100) / 100 +
          Math.round((calculateTotal - (calculateTotal * 3) / 23) * 100) / 100,
        gst: Math.round(((calculateTotal * 3) / 23) * 100) / 100,
        exclGst:
          Math.round((calculateTotal - (calculateTotal * 3) / 23) * 100) / 100,
      },
    };
    setOrderTotal(tempTotal);
    handleItems(list, tempTotal);
  };
  const handleSubtotal = (list, i) => {
    list[i].itemSubtotal = list[i].itemQty * list[i].itemPrice;
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
    handleTotal(list);
  };
  const handleRemoveInput = (i) => {
    const list = [...inputList];
    list.splice(i, 1);
    handleTotal(list);
  };
  const { items, classes, orderItems, handleItems } = props; //add in orderItems here
  let newArray;
  let filteredArray;
  if (items && orderItems) {
    if (inputList[0].itemName === null) {
      setInputList(orderItems);
      handleTotal(orderItems);
      handleItems(orderItems, props.orderTotal);
    }
    newArray = [...items, ...orderItems];
    filteredArray = newArray.filter(
      (newArray, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.id === newArray.id &&
            t.itemName === newArray.itemName &&
            t.itemPrice === newArray.itemPrice
        )
    );
  } else if (items && !orderItems) {
    filteredArray = items;
  }
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
                value={x}
                options={filteredArray}
                getOptionSelected={(x) => x.itemName}
                onChange={(e, x) => handleListChange(e, i, x)}
                renderOption={(x) => x.itemName}
                getOptionLabel={(x) => x.itemName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Item Name"
                    placeholder="Search.."
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
                inputProps={{ min: 1, style: { textAlign: "center" } }}
                value={x.itemQty}
                onChange={(e) => handleQtyChange(e, i)}
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.supplier}>
              <TextField
                id="supplierName"
                inputProps={{
                  style: { textAlign: "left" },
                  readOnly: true,
                }}
                type="text"
                value={x.supplierName}
                label="Supplier"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.link}>
              <Link
                to={{
                  pathname: x.itemLink,
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
                inputProps={{
                  min: 0,
                  style: { textAlign: "right" },
                  readOnly: true,
                }}
                id="itemPrice"
                type="text"
                value={Intl.NumberFormat("en-NZ", {
                  style: "currency",
                  currency: "NZD",
                }).format(x.itemPrice)}
                label="Price"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.itemSubtotal}>
              <TextField
                inputProps={{
                  min: 0,
                  style: { textAlign: "right" },
                  readOnly: true,
                }}
                id="itemSubtotal"
                type="text"
                value={Intl.NumberFormat("en-NZ", {
                  style: "currency",
                  currency: "NZD",
                }).format(x.itemSubtotal)}
                label="Subtotal"
                variant="outlined"
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
      <Grid className={classes.totalRow}>
        <Grid className={classes.totalItems}>
          <TextField
            inputProps={{
              min: 0,
              style: { textAlign: "right" },
              readOnly: true,
            }}
            id="gstExcl"
            type="text"
            value={Intl.NumberFormat("en-NZ", {
              style: "currency",
              currency: "NZD",
            }).format(orderTotal.orderTotal.exclGst)}
            label="Total Excl. GST"
            variant="outlined"
          />
        </Grid>
        <Grid className={classes.totalItems}>
          <TextField
            inputProps={{
              min: 0,
              style: { textAlign: "right" },
              readOnly: true,
            }}
            id="gst"
            type="text"
            value={Intl.NumberFormat("en-NZ", {
              style: "currency",
              currency: "NZD",
            }).format(orderTotal.orderTotal.gst)}
            label="GST Amount"
            variant="outlined"
          />
        </Grid>
        <Grid className={classes.totalItems}>
          <TextField
            inputProps={{
              min: 0,
              style: { textAlign: "right" },
              readOnly: true,
            }}
            id="total"
            type="text"
            value={Intl.NumberFormat("en-NZ", {
              style: "currency",
              currency: "NZD",
            }).format(orderTotal.orderTotal.total)}
            label="Total Incl. GST"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default OrderItems;
//<pre>{JSON.stringify(inputList, null, 2)}</pre>
