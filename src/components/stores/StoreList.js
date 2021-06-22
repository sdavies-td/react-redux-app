import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { themeStyles } from "../../theme";

const useStyles = makeStyles((theme) => themeStyles);

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
            placeholder="Search Store Name..."
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
                  } else if (name.toLowerCase().includes(value.toLowerCase())) {
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
