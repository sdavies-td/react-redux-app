import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
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

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { themeStyles } from "../../theme";

const useStyles = makeStyles((theme) => themeStyles);

const CustomerList = ({ customers }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="h6">Customer</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Email</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Phone</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Address</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Created At</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Created By</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Options</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers &&
                customers
                  .filter((customer) => {
                    if (!customer.fullName) {
                      return customer;
                    } else if (
                      customer.fullName
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    ) {
                      return customer;
                    }
                    return null;
                  })
                  .map((customer, i) => {
                    const {
                      id,
                      fullName,
                      email,
                      phone,
                      address,
                      createdAt,
                      createdByName,
                    } = customer;
                    return (
                      <TableRow key={i}>
                        <TableCell align="left">{fullName}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{phone}</TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="left">
                          {moment(createdAt.toDate()).calendar()}
                        </TableCell>
                        <TableCell align="left">{createdByName}</TableCell>
                        <TableCell align="right">
                          <Link to={"/customers/edit/" + id}>
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
      </Grid>
    </Grid>
  );
};

export default CustomerList;
