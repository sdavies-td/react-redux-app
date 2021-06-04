import React, { useState } from "react";
import ItemSummary from "./ItemSummary";
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
    bitemRadius: theme.shape.bitemRadius,
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

const ItemList = ({ items }) => {
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
            placeholder="Search item…"
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
                <Typography variant="h6">Item Number</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Item Email</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Item</Typography>
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
            {items &&
              items
                .filter((item) => {
                  if (!item.fullName) {
                    return item;
                  } else if (
                    item.fullName.toLowerCase().includes(value.toLowerCase())
                  ) {
                    return item;
                  }
                  return null;
                })
                .map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell align="right">{item.email}</TableCell>
                      <TableCell align="left">{item.fullName}</TableCell>
                      <TableCell align="left">{item.name}</TableCell>
                      <TableCell align="left">{item.status}</TableCell>
                      <TableCell align="right">
                        <Link to={"/items/view/" + item.id}>
                          <IconButton>
                            <VisibilityIcon>
                              <ItemSummary item={item} />
                            </VisibilityIcon>
                          </IconButton>
                        </Link>
                        <Link to={"/items/edit/" + item.id}>
                          <IconButton>
                            <EditIcon>
                              <ItemSummary item={item} />
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

export default ItemList;
