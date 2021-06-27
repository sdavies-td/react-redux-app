import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  Typography,
  TextField,
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
import { themeStyles } from "../../theme";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => themeStyles);

const StoreList = ({ stores, handleDelete }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = (store) => {
    setOpen(true);
    setDeleteStore(store);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [value, setValue] = useState("");
  const [deleteStore, setDeleteStore] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  if (stores.length > 0) {
    return (
      <Grid>
        <Grid className={classes.search}>
          <TextField
            id="outlined-search"
            label="Search by Store Name..."
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
                  <TableCell align="left">
                    <Typography variant="h6">Store Name</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">Address</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">Bank Account</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">GST Number</Typography>
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
                {stores &&
                  stores
                    .filter((store) => {
                      const { name } = store;
                      if (!name) {
                        return store;
                      } else if (
                        name.toLowerCase().includes(value.toLowerCase())
                      ) {
                        return store;
                      }
                      return null;
                    })
                    .map((store, i) => {
                      const {
                        id,
                        name,
                        address,
                        bank,
                        gst,
                        createdAt,
                        createdByName,
                      } = store;
                      return (
                        <TableRow key={i}>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{bank}</TableCell>
                          <TableCell align="left">{gst}</TableCell>
                          <TableCell align="left">
                            {moment(createdAt.toDate()).calendar()}
                          </TableCell>
                          <TableCell align="left">{createdByName}</TableCell>
                          <TableCell align="right">
                            <Link to={"/stores/edit/" + id}>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Link>
                            <IconButton
                              onClick={() => {
                                handleClickOpen(store);
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
                                Are you sure you want to delete store '
                                {deleteStore.name}'?
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Once you delete this store it will no longer
                                  be available when creating and editing orders
                                  in the future.
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
                                    handleDelete(deleteStore.id);
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

export default StoreList;
