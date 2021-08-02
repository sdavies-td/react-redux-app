import React from "react";

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";

import _ from "lodash";
import Loader from "../utils/Loader";

export default function EditOrderDialog(props) {
  const {
    classes,
    beforeChange,
    proposedChange,
    handleClose,
    boolean,
    handleSubmit,
  } = props;
  if (_.isEmpty(beforeChange, proposedChange)) {
    return <Loader />;
  } else {
    const warning = {
      date: "black",
      shipping: "black",
      store: "black",
      customer: "black",
      orderItems: "black",
      orderTotal: "black",
    };
    if (!_.isEqual(beforeChange.orderItems, proposedChange.orderItems)) {
      warning.orderItems = "red";
    }
    if (!_.isEqual(beforeChange.shipping, proposedChange.shipping)) {
      warning.shipping = "red";
    }
    if (!_.isEqual(beforeChange.orderDate, proposedChange.orderDate)) {
      warning.date = "red";
    }
    if (!_.isEqual(beforeChange.store, proposedChange.store)) {
      warning.store = "red";
    }
    if (!_.isEqual(beforeChange.orderTotal, proposedChange.orderTotal)) {
      warning.orderTotal = "red";
    }
    if (!_.isEqual(beforeChange.customer, proposedChange.customer)) {
      warning.customer = "red";
    }
    return (
      <Dialog
        maxWidth="lg"
        open={boolean}
        onBackdropClick={() => {
          handleClose();
        }}
      >
        <DialogTitle align="center">
          Review changes for order: {beforeChange.orderCount}?
        </DialogTitle>
        <Grid className={classes.orderButtonRow}>
          <Grid className={classes.dialogItem}>
            <DialogTitle align="center">Before Change</DialogTitle>
            <DialogContent>
              <TableContainer component={Paper}>
                <DialogTitle align="center">Order Info</DialogTitle>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ color: [warning.date] }}>
                        Date: {beforeChange.orderDate}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.shipping] }}>
                        Shipping: {beforeChange.shipping.method}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <DialogTitle align="center">Store Info</DialogTitle>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ color: [warning.store] }}>
                        Name: {beforeChange.store.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.store] }}>
                        Address: {beforeChange.store.address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.store] }}>
                        Bank: {beforeChange.store.bank}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.store] }}>
                        GST: {beforeChange.store.gst}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <DialogTitle align="center">Customer Info</DialogTitle>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ color: [warning.customer] }}>
                        Name: {beforeChange.customer.fullName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.customer] }}>
                        Email: {beforeChange.customer.email}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.customer] }}>
                        Phone: {beforeChange.customer.phone}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.customer] }}>
                        Address: {beforeChange.customer.address}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <DialogTitle align="center">Order Items</DialogTitle>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Supplier</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {beforeChange.orderItems.map((row, i) => (
                      <TableRow key={row.itemName}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ color: [warning.orderItems] }}
                        >
                          {row.itemName}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: [warning.orderItems] }}
                        >
                          {row.supplierName}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: [warning.orderItems] }}
                        >
                          {row.itemQty}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: [warning.orderItems] }}
                        >
                          {Intl.NumberFormat("en-NZ", {
                            style: "currency",
                            currency: "NZD",
                          }).format(row.itemPrice)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: [warning.orderItems] }}
                        >
                          {Intl.NumberFormat("en-NZ", {
                            style: "currency",
                            currency: "NZD",
                          }).format(row.itemSubtotal)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <DialogTitle align="center">Order Total</DialogTitle>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="right"
                        className={classes.textBold}
                        style={{ borderBottom: "none" }}
                      >
                        Total excl. GST
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        className={classes.textBold}
                        align="right"
                      >
                        GST
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        className={classes.textBold}
                        align="right"
                      >
                        Total
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        className={classes.textBold}
                        align="right"
                      >
                        Outstanding Balance
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{ color: [warning.orderTotal] }}
                        component="th"
                        scope="row"
                        align="right"
                      >
                        {Intl.NumberFormat("en-NZ", {
                          style: "currency",
                          currency: "NZD",
                        }).format(beforeChange.orderTotal.orderTotal.exclGst)}
                      </TableCell>
                      <TableCell
                        style={{ color: [warning.orderTotal] }}
                        align="right"
                      >
                        {Intl.NumberFormat("en-NZ", {
                          style: "currency",
                          currency: "NZD",
                        }).format(beforeChange.orderTotal.orderTotal.gst)}
                      </TableCell>
                      <TableCell
                        style={{ color: [warning.orderTotal] }}
                        align="right"
                      >
                        {Intl.NumberFormat("en-NZ", {
                          style: "currency",
                          currency: "NZD",
                        }).format(beforeChange.orderTotal.orderTotal.total)}
                      </TableCell>
                      <TableCell
                        style={{ color: [warning.orderTotal] }}
                        align="right"
                      >
                        {Intl.NumberFormat("en-NZ", {
                          style: "currency",
                          currency: "NZD",
                        }).format(beforeChange.orderTotal.orderTotal.total)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table size="small"></Table>
              </TableContainer>
            </DialogContent>
          </Grid>
          <Grid className={classes.dialogItem}>
            <DialogTitle align="center">Proposed Change</DialogTitle>
            <DialogContent>
              <TableContainer component={Paper}>
                <DialogTitle align="center">Order Info</DialogTitle>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ color: [warning.date] }}>
                        Date: {proposedChange.orderDate}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.shipping] }}>
                        Shipping: {proposedChange.shipping.method}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <DialogTitle align="center">Store Info</DialogTitle>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ color: [warning.store] }}>
                        Name: {proposedChange.store.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.store] }}>
                        Address: {proposedChange.store.address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.store] }}>
                        Bank: {proposedChange.store.bank}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.store] }}>
                        GST: {proposedChange.store.gst}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <DialogTitle align="center">Customer Info</DialogTitle>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ color: [warning.customer] }}>
                        Name: {proposedChange.customer.fullName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.customer] }}>
                        Email: {proposedChange.customer.email}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.customer] }}>
                        Phone: {proposedChange.customer.phone}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: [warning.customer] }}>
                        Address: {proposedChange.customer.address}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <DialogTitle align="center">Order Items</DialogTitle>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Supplier</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {proposedChange.orderItems.map((row, i) => (
                      <TableRow key={row.itemName}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ color: [warning.orderItems] }}
                        >
                          {row.itemName}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: [warning.orderItems] }}
                        >
                          {row.supplierName}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: [warning.orderItems] }}
                        >
                          {row.itemQty}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: [warning.orderItems] }}
                        >
                          {Intl.NumberFormat("en-NZ", {
                            style: "currency",
                            currency: "NZD",
                          }).format(row.itemPrice)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: [warning.orderItems] }}
                        >
                          {Intl.NumberFormat("en-NZ", {
                            style: "currency",
                            currency: "NZD",
                          }).format(row.itemSubtotal)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <DialogTitle align="center">Order Total</DialogTitle>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="right"
                        className={classes.textBold}
                        style={{ borderBottom: "none" }}
                      >
                        Total excl. GST
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        className={classes.textBold}
                        align="right"
                      >
                        GST
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        className={classes.textBold}
                        align="right"
                      >
                        Total
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        className={classes.textBold}
                        align="right"
                      >
                        Outstanding Balance
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{ color: [warning.orderTotal] }}
                        component="th"
                        scope="row"
                        align="right"
                      >
                        {Intl.NumberFormat("en-NZ", {
                          style: "currency",
                          currency: "NZD",
                        }).format(proposedChange.orderTotal.orderTotal.exclGst)}
                      </TableCell>
                      <TableCell
                        style={{ color: [warning.orderTotal] }}
                        align="right"
                      >
                        {Intl.NumberFormat("en-NZ", {
                          style: "currency",
                          currency: "NZD",
                        }).format(proposedChange.orderTotal.orderTotal.gst)}
                      </TableCell>
                      <TableCell
                        style={{ color: [warning.orderTotal] }}
                        align="right"
                      >
                        {Intl.NumberFormat("en-NZ", {
                          style: "currency",
                          currency: "NZD",
                        }).format(proposedChange.orderTotal.orderTotal.total)}
                      </TableCell>
                      <TableCell
                        style={{ color: [warning.orderTotal] }}
                        align="right"
                      >
                        {Intl.NumberFormat("en-NZ", {
                          style: "currency",
                          currency: "NZD",
                        }).format(proposedChange.orderTotal.orderTotal.total)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table size="small"></Table>
              </TableContainer>
            </DialogContent>
          </Grid>
        </Grid>
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
              handleSubmit();
            }}
            color="primary"
            autoFocus
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
