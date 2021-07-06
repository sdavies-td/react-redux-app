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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const CustomerList = ({ customers, handleDelete, classes }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (customer) => {
    setOpen(true);
    setDeleteCustomer(customer);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = useState("");
  const [deleteCustomer, setDeleteCustomer] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  if (customers.length > 0) {
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
                            <IconButton
                              onClick={() => {
                                handleClickOpen(customer);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="responsive-dialog-title"
                              PaperProps={{
                                style: {
                                  boxShadow:
                                    "0 2px 2px rgba(0,0,0,0.16), 0 2px 2px rgba(0,0,0,0.23)",
                                },
                              }}
                              variant="elevation"
                              BackdropProps={{
                                style: {
                                  backgroundColor: "#000000",
                                  opacity: "0.2",
                                  //backdropFilter: "blur(5px)",
                                },
                              }}
                            >
                              <DialogTitle id="responsive-dialog-title">
                                Are you sure you want to delete customer '
                                {deleteCustomer.fullName}'?
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Once you delete this customer it will no
                                  longer be available when creating and editing
                                  orders in the future.
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  autoFocus
                                  onClick={() => {
                                    handleClose();
                                  }}
                                  color="secondary"
                                  variant="outlined"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleDelete(deleteCustomer.id);
                                    handleClose();
                                  }}
                                  color="secondary"
                                  autoFocus
                                  variant="contained"
                                >
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>
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
      <div>No stores found, create a new store by clicking the 'add' icon.</div>
    );
  }
};

export default CustomerList;
