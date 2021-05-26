import React, { Component } from "react";
import StoreList from "../stores/StoreList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, IconButton, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  paper: { padding: theme.spacing(2) },
  iconButton: {},
});

class StoresDashboard extends Component {
  render() {
    const { stores, auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography variant="h6">Stores</Typography>
              <IconButton color="primary" component={Link} to="/stores/create">
                <AddCircleIcon />
              </IconButton>
              <StoreList stores={stores} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
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
