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
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const ItemList = ({ items, handleDelete, classes }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = (item) => {
    setOpen(true);
    setDeleteItem(item);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = useState("");
  const [deleteItem, setDeleteItem] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  if (items.length > 0) {
    return (
      <Grid>
        <Grid className={classes.search}>
          <TextField
            id="outlined-search"
            label="Search by Item Name..."
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
                  <TableCell align="right">
                    <Typography variant="h6">Item Name</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">Supplier</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">Price (Incl. GST)</Typography>
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
                {items &&
                  items
                    .filter((item) => {
                      if (!item.itemName) {
                        return item;
                      } else if (
                        item.itemName
                          .toLowerCase()
                          .includes(value.toLowerCase())
                      ) {
                        return item;
                      }
                      return null;
                    })
                    .sort((a, b) => (b.createdAt > a.createdAt && 1) || -1)
                    .map((item, i) => {
                      const {
                        id,
                        itemName,
                        supplierName,
                        itemPrice,
                        itemLink,
                        createdByName,
                        createdAt,
                      } = item;
                      return (
                        <TableRow key={i}>
                          <TableCell align="left">{itemName}</TableCell>
                          <TableCell align="left">{supplierName}</TableCell>
                          <TableCell align="right">
                            {Intl.NumberFormat("en-NZ", {
                              style: "currency",
                              currency: "NZD",
                            }).format(itemPrice)}
                          </TableCell>
                          <TableCell align="left">
                            {moment(createdAt.toDate()).calendar()}
                          </TableCell>
                          <TableCell align="left">{createdByName}</TableCell>
                          <TableCell align="right">
                            <Link
                              to={{
                                pathname: itemLink,
                              }}
                              target="_blank"
                            >
                              <IconButton>
                                <LinkIcon />
                              </IconButton>
                            </Link>
                            <Link to={"/items/edit/" + id}>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Link>
                            <IconButton
                              onClick={() => {
                                handleClickOpen(item);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  boxShadow:
                                    "0 2px 2px rgba(0,0,0,0.16), 0 2px 2px rgba(0,0,0,0.23)",
                                },
                              }}
                              BackdropProps={{
                                style: {
                                  backgroundColor: "#000000",
                                  opacity: "0.2",
                                },
                              }}
                            >
                              <DialogTitle>
                                Are you sure you want to delete item '
                                {deleteItem.itemName}'?
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Once you delete this item it will no longer be
                                  available when creating and editing orders in
                                  the future.
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
                                    handleDelete(deleteItem.id);
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
      <div>No items found, create a new item by clicking the 'add' icon.</div>
    );
  }
};

export default ItemList;
