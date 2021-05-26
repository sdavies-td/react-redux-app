import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Loader from "../layout/Loader";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import EditSupplierItem from "./EditSupplierItem";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const currency = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
});

const ItemDetails = (props) => {
  const classes = useStyles();
  const { auth, item, suppliers, id } = props;
  //console.log(id);
  if (!auth.uid) return <Redirect to="/auth/signin" />;
  if (item && suppliers) {
    return (
      <div>
        <div className="container section item-details">
          <div className="row center">
            <h4>Item</h4>
          </div>
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{item.name}</span>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Created By: {item.createdByName}</div>
              <div>
                Date Created: {moment(item.createdAt.toDate()).calendar()}
              </div>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Suppliers</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="left">Options</TableCell>
                </TableRow>
              </TableHead>
              {suppliers.map((supplier) => (
                <TableBody>
                  <TableRow key={supplier.id}>
                    <TableCell component="th" scope="row">
                      {supplier.supplierName}
                    </TableCell>
                    <TableCell align="right">
                      {currency.format(supplier.supplierPrice)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          href={supplier.supplierLink}
                        >
                          <LinkIcon />
                        </Link>
                      </IconButton>
                      <RouterLink
                        to={
                          "/items/view/" + id + "/suppliers/edit/" + supplier.id
                        }
                        key={supplier.id}
                      >
                        <IconButton>
                          <EditIcon>
                            <EditSupplierItem />
                          </EditIcon>
                        </IconButton>
                      </RouterLink>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const items = state.firestore.data.items;
  const item = items ? items[id] : null;
  //const suppliers = state.firestore.data.items;
  //console.log(state);
  return {
    item,
    auth: state.firebase.auth,
    suppliers: state.firestore.ordered.suppliers,
    id,
  };
};

export default compose(
  firestoreConnect((state, ownProps) => {
    const id = ownProps.match.params.id;
    //console.log(id);
    return [
      { collection: "items" },
      {
        collection: "items",
        doc: id,
        subcollections: [{ collection: "suppliers" }],
        storeAs: "suppliers",
      },
    ];
  }),
  connect(mapStateToProps)
)(ItemDetails);
