import React, { useState } from "react";
import OrderSummary from "./OrderSummary";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  InputBase,
  Table,
  TableBody,
  TableCell,
  Paper,
  TableHead,
  TableRow,
  IconButton,
  Grid,
} from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const OrderList = ({ orders }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <React.Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search customer…"
            id="search"
            type="search"
            value={value}
            onChange={handleChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Grid>
      <Paper>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="left">Store</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          {orders &&
            orders
              .filter((order) => {
                if (value === "") {
                  return order;
                } else if (
                  order.customer.fullName
                    .toLowerCase()
                    .includes(value.toLowerCase())
                ) {
                  return order;
                }
                return null;
              })
              .map((order) => {
                console.log(order);
                return (
                  <TableBody>
                    <TableRow key={order.id}>
                      <TableCell component="th" scope="row">
                        {order.id}
                      </TableCell>
                      <TableCell align="right">{order.orderDate}</TableCell>
                      <TableCell align="left">
                        {order.customer.fullName}
                      </TableCell>
                      <TableCell align="left">{order.store.name}</TableCell>
                      <TableCell align="left">{order.status}</TableCell>
                      <TableCell align="right">
                        <RouterLink
                          to={"/orders/view/" + order.id}
                          key={order.id}
                        >
                          <IconButton>
                            <VisibilityIcon>
                              <OrderSummary order={order} />
                            </VisibilityIcon>
                          </IconButton>
                        </RouterLink>
                        <RouterLink
                          to={"/orders/edit/" + order.id}
                          key={order.id}
                        >
                          <IconButton>
                            <EditIcon>
                              <OrderSummary order={order} />
                            </EditIcon>
                          </IconButton>
                        </RouterLink>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default OrderList;
