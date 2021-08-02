import React, { Component } from "react";
import CustomerList from "./CustomerList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteCustomer } from "../../store/actions/customerActions";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Loader from "../utils/Loader";
import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class CustomersDashboard extends Component {
  handleDelete(id) {
    this.props.deleteCustomer(id);
  }
  render() {
    const { customers, classes } = this.props;
    if (customers) {
      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>Customers</Typography>
            <IconButton color="primary" component={Link} to="/customers/create">
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid className={classes.body}>
            <CustomerList
              customers={customers}
              handleDelete={this.handleDelete.bind(this)}
              classes={classes}
            />
          </Grid>
        </Grid>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.firestore.ordered.customers,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCustomer: (id) => dispatch(deleteCustomer(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "customers" }]),
  withStyles(styles, { withTheme: true })
)(CustomersDashboard);
