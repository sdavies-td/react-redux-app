import React from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import PrintIcon from "@material-ui/icons/Print";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Loader from "../utils/Loader";
import moment from "moment";
import {
  Grid,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  IconButton,
  Typography,
  Divider,
  Box,
} from "@material-ui/core";

import "./ViewOrder.css";
import logo from "../navbar/logo.png";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bold: {
    fontWeight: 600,
  },
  grey: {
    color: "#9b9b9b",
    fontSize: "14px",
  },
  textBold: {
    fontWeight: 600,
    fontSize: "14px",
  },
  text: {
    fontSize: "14px",
  },
  textRight: {
    paddingLeft: "4px",
    fontSize: "14px",
  },
  orderItems: {
    variant: "outlined",
  },
  paddingTop: {
    paddingTop: "8px",
  },
});

class ViewOrder extends React.Component {
  render() {
    const { history, orders, id, classes } = this.props;
    const styleForButton = {
      width: 60,
      height: 60,
    };
    const styleForIcon = {
      width: 40,
      height: 40,
    };
    if (orders && id) {
      const [, ...rest] = orders;
      const tempOrder = rest.find((x) => x.id === id);
      const {
        editedLastById,
        editedLastByName,
        editedLastAt,
        createdByName,
        createdById,
        createdAt,
        status,
        ...order
      } = tempOrder;
      const {
        orderCount,
        orderDate,
        customer,
        store,
        orderItems,
        shipping,
        orderTotal,
      } = order;
      return (
        <ReactToPrint
          content={() => this.componentRef}
          documentTitle={"PK" + orderCount}
        >
          <IconButton onClick={history.goBack} style={styleForButton}>
            <ArrowBackIcon style={styleForIcon} />
          </IconButton>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <IconButton style={styleForButton} onClick={handlePrint}>
                <PrintIcon style={styleForIcon} />
              </IconButton>
            )}
          </PrintContextConsumer>
          <div className="a4" ref={(el) => (this.componentRef = el)}>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <NavLink
                    to={{
                      pathname: "https://www.projectkitchens.co.nz/",
                    }}
                    target="_blank"
                  >
                    <div className="logo">
                      <img className="pk-logo" src={logo} alt="Logo" />
                    </div>
                  </NavLink>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    className={classes.bold}
                    align="right"
                    variant="h4"
                    color="initial"
                  >
                    Tax invoice
                  </Typography>
                  <Typography align="right" variant="h5" color="initial">
                    {orderCount}
                  </Typography>
                  <Typography className={classes.grey} align="right">
                    Generated: {moment().format("DD MMM yyyy")} at{" "}
                    {moment().format("HH:mm")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.textBold}>
                    Project Kitchens Limited
                  </Typography>
                  <Typography className={classes.text}>
                    Project Kitchens {store.name}
                  </Typography>
                  <Typography className={classes.text}>
                    {store.address}
                  </Typography>
                  <Grid container direction="row" alignItems="center">
                    <Typography className={classes.textBold}>
                      Bank account:
                    </Typography>
                    <Typography className={classes.textRight}>
                      Kiwibank {store.bank}
                    </Typography>
                  </Grid>
                  <Grid container direction="row" alignItems="center">
                    <Typography className={classes.textBold}>GST:</Typography>
                    <Typography className={classes.textRight}>
                      {store.gst}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={8}>
                  <Typography className={classes.textBold}>Billing:</Typography>
                  <Typography className={classes.text}>
                    {customer.fullName}
                  </Typography>
                  <Typography className={classes.text}>
                    {customer.email}
                  </Typography>
                  <Typography className={classes.text}>
                    {customer.phone}
                  </Typography>
                  <Typography className={classes.text}>
                    {customer.address}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" alignItems="center">
                    <Typography className={classes.textBold}>
                      Order date:
                    </Typography>
                    <Typography className={classes.textRight}>
                      {moment(orderDate, "DD-MM-YYYY").format("DD MMM yyyy")}
                    </Typography>
                  </Grid>
                  <Grid container direction="row" alignItems="center">
                    <Typography className={classes.textBold}>
                      Shipping:
                    </Typography>
                    <Typography className={classes.textRight}>
                      {shipping.method}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box border={1}>
                    <TableContainer
                      className={classes.table}
                      variant="outlined"
                      square
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              className={classes.textBold}
                              style={{ borderBottom: "none" }}
                            >
                              Name
                            </TableCell>
                            <TableCell
                              style={{ borderBottom: "none" }}
                              className={classes.textBold}
                              align="right"
                            >
                              Qty
                            </TableCell>
                            <TableCell
                              style={{ borderBottom: "none" }}
                              className={classes.textBold}
                              align="right"
                            >
                              Unit Price
                            </TableCell>
                            <TableCell
                              style={{ borderBottom: "none" }}
                              className={classes.textBold}
                              align="right"
                            >
                              Subtotal
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderItems.map((x) => (
                            <TableRow>
                              <TableCell
                                style={{ borderBottom: "none" }}
                                component="th"
                                scope="row"
                              >
                                {x.itemName}
                              </TableCell>
                              <TableCell
                                style={{ borderBottom: "none" }}
                                align="right"
                              >
                                {x.itemQty}
                              </TableCell>
                              <TableCell
                                style={{ borderBottom: "none" }}
                                align="right"
                              >
                                {Intl.NumberFormat("en-NZ", {
                                  style: "currency",
                                  currency: "NZD",
                                }).format(x.itemPrice)}
                              </TableCell>
                              <TableCell
                                style={{ borderBottom: "none" }}
                                align="right"
                              >
                                {Intl.NumberFormat("en-NZ", {
                                  style: "currency",
                                  currency: "NZD",
                                }).format(x.itemSubtotal)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box border={1}>
                    <TableContainer
                      className={classes.table}
                      variant="outlined"
                      square
                    >
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
                              style={{ borderBottom: "none" }}
                              component="th"
                              scope="row"
                              align="right"
                            >
                              {Intl.NumberFormat("en-NZ", {
                                style: "currency",
                                currency: "NZD",
                              }).format(orderTotal.orderTotal.exclGst)}
                            </TableCell>
                            <TableCell
                              style={{ borderBottom: "none" }}
                              align="right"
                            >
                              {Intl.NumberFormat("en-NZ", {
                                style: "currency",
                                currency: "NZD",
                              }).format(orderTotal.orderTotal.gst)}
                            </TableCell>
                            <TableCell
                              style={{ borderBottom: "none" }}
                              align="right"
                            >
                              {Intl.NumberFormat("en-NZ", {
                                style: "currency",
                                currency: "NZD",
                              }).format(orderTotal.orderTotal.total)}
                            </TableCell>
                            <TableCell
                              style={{ borderBottom: "none" }}
                              align="right"
                            >
                              {Intl.NumberFormat("en-NZ", {
                                style: "currency",
                                currency: "NZD",
                              }).format(orderTotal.orderTotal.total)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography className={classes.textBold}>
                    Additional Information:
                  </Typography>
                  <ul>
                    <li>
                      The supply of all products from Us to You is subject to
                      our Terms of Trade which is enclosed. It can also be
                      viewed at our website or obtained by calling us. By
                      accepting this document you are deemed to have read and
                      agreed to our Terms of Trade.
                    </li>
                    <li>
                      All cabinets come flat-packed unless otherwise stated.
                      Cabinets can be assembled for an extra cost; please see
                      our Terms and Conditions for more information.
                    </li>
                    <li>All prices are GST inclusive.</li>
                    <li>
                      100% payment is required before any product and/or service
                      can be picked up, delivered or provided.
                    </li>
                    <li>
                      Please check your products list has the correct items,
                      styles and quantities. It is the purchasers responsibility
                      to ensure this is correct at the time of order placement.
                      Refunds cannot be done for change of mind, as these are
                      the special order items.
                    </li>
                  </ul>
                  <p>
                    * I confirm the list of products is correct and I accept the
                    terms and conditions.
                  </p>
                  <br />
                  <br />
                  <br />
                  <Divider />
                  <p className={classes.paddingTop}>
                    Your signature and date here.
                  </p>
                </Grid>
              </Grid>
            </div>
            <div className="page">1/1</div>
            <div className="company-name">
              <div>Project Kitchens Limited</div>
              <div>
                Ph: 0800 733527 | info@projectkitchens.co.nz |
                commerce.projectkitchens.co.nz
              </div>
            </div>
          </div>
        </ReactToPrint>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const db = state.firestore.ordered;
  return {
    auth: state.firebase.auth,
    orders: db.orders,
    id,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "orders" }]),
  withStyles(styles)
)(ViewOrder);
