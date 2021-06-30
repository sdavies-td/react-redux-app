import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
import { themeStyles } from "../../theme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => themeStyles);

const ItemList = ({ items, handleDelete }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClickOpen = (item) => {
    setOpen(true);
    setDeleteItem(item);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [deleteItem, setDeleteItem] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  if (items) {
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
            <Table aria-label="simple table">
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
                              fullScreen={fullScreen}
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="responsive-dialog-title"
                            >
                              <DialogTitle id="responsive-dialog-title">
                                Are you sure you want to delete item '
                                {deleteItem.name}'?
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
                                  onClick={handleClose}
                                  color="secondary"
                                  variant="outlined"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleDelete(deleteItem.id);
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
