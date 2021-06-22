import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
import { themeStyles } from "../../theme";

const useStyles = makeStyles((theme) => themeStyles);

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
            placeholder="Search Item Name…"
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
                    item.itemName.toLowerCase().includes(value.toLowerCase())
                  ) {
                    return item;
                  }
                  return null;
                })
                .map((item, i) => {
                  const {
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
                        <Link to={"/items/edit/" + item.id}>
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

export default ItemList;
