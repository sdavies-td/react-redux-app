import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  Paper,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
//import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import EditIcon from "@material-ui/icons/Edit";

const OrderList = ({ orders, classes }) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [, ...rest] = orders;
  if (rest.length > 0) {
    return (
      <Grid>
        <Grid className={classes.search}>
          <TextField
            id="outlined-search"
            label="Search by Customer..."
            type="search"
            variant="outlined"
            value={value}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid className={classes.body}>
          <Paper className={classes.tablePaper}>
            <Table size="small">
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
                  <TableCell align="left">
                    <Typography variant="h6">Created At</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">Created By</Typography>
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
                    .sort((a, b) => (b.orderCount > a.orderCount && 1) || -1)
                    .map((order, i) => {
                      const {
                        id,
                        orderCount,
                        orderDate,
                        customer,
                        store,
                        status,
                        createdByName,
                        createdAt,
                      } = order;
                      const { name } = store;
                      const { fullName } = customer;
                      return (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            {orderCount}
                          </TableCell>
                          <TableCell align="right">{orderDate}</TableCell>
                          <TableCell align="left">{fullName}</TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{status}</TableCell>
                          <TableCell align="left">
                            {moment(createdAt.toDate()).calendar()}
                          </TableCell>
                          <TableCell align="left">{createdByName}</TableCell>
                          <TableCell align="right">
                            <Link
                              to={{ pathname: "/orders/view/" + id, order }}
                            >
                              <IconButton>
                                <VisibilityIcon />
                              </IconButton>
                            </Link>
                            <Link to={"/orders/edit/" + id}>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid>
          No orders found, create a new order by clicking the 'add' icon.
        </Grid>
        <Grid>
          Note: Before making your first order, make sure you have created
          prerequisite information such as Items, Customers and Stores.
        </Grid>
      </Grid>
    );
  }
};

export default OrderList;
