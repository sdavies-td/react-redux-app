import React, { useState } from "react";
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
  Typography,
} from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
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
  const [, ...rest] = orders;
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
              <TableCell className="bold">
                <Typography variant="h6">Order Number</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Order Date</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Customer</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Store</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Options</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rest &&
              rest
                .filter((order) => {
                  if (!order.customer.fullName) {
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
                .map((order, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {order.orderCount}
                      </TableCell>
                      <TableCell align="right">{order.orderDate}</TableCell>
                      <TableCell align="left">
                        {order.customer.fullName}
                      </TableCell>
                      <TableCell align="left">{order.store.name}</TableCell>
                      <TableCell align="left">{order.status}</TableCell>
                      <TableCell align="right">
                        <Link to={"/orders/view/" + order.id}>
                          <IconButton>
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                        <Link to={"/orders/edit/" + order.id}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default OrderList;
