import React, { Component } from "react";
import StoreList from "../stores/StoreList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Loader from "../layout/Loader";

const styles = (theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "Medium",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
});

class StoresDashboard extends Component {
  render() {
    const { stores, auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (stores) {
      return (
        <Grid className={classes.root}>
          <Grid container className={classes.header}>
            <Typography className={classes.title}>Stores</Typography>
            <IconButton color="primary" component={Link} to="/stores/create">
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid container className={classes.body}>
            <StoreList stores={stores} />
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
    stores: state.firestore.ordered.stores,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "stores" }]),
  withStyles(styles, { withTheme: true })
)(StoresDashboard);
