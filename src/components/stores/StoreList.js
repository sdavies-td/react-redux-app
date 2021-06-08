import React, { useState } from "react";
import StoreSummary from "./StoreSummary";
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
    bstoreRadius: theme.shape.bstoreRadius,
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
    alignStores: "center",
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

const StoreList = ({ stores }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <React.Fragment>
      <Grid container direction="row" justify="center" alignStores="center">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search store…"
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
              <TableCell align="left">
                <Typography variant="h6">Store</Typography>
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
              <TableCell align="right">
                <Typography variant="h6">Options</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores &&
              stores
                .filter((store) => {
                  if (!store.fullName) {
                    return store;
                  } else if (
                    store.fullName.toLowerCase().includes(value.toLowerCase())
                  ) {
                    return store;
                  }
                  return null;
                })
                .map((store, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="left">{store.name}</TableCell>
                      <TableCell align="left">{store.address}</TableCell>
                      <TableCell align="left">{store.bank}</TableCell>
                      <TableCell align="left">{store.gst}</TableCell>
                      <TableCell align="right">
                        <Link to={"/stores/edit/" + store.id}>
                          <IconButton>
                            <EditIcon>
                              <StoreSummary store={store} />
                            </EditIcon>
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

export default StoreList;
