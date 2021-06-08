import React, { Component } from "react";
import ItemList from "../items/ItemList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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

class ItemsDashboard extends Component {
  render() {
    const { items, auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (items) {
      return (
        <Grid className={classes.root}>
          <Grid container className={classes.header}>
            <Typography className={classes.title}>Order Items</Typography>
            <IconButton
              color="primary"
              component={Link}
              classes={classes}
              to="/items/create"
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid container className={classes.body}>
            <ItemList items={items} />
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
    items: state.firestore.ordered.items,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "items" }]),
  withStyles(styles, { withTheme: true })
)(ItemsDashboard);
