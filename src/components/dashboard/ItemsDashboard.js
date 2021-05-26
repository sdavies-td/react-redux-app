import React, { Component } from "react";
import ItemList from "../items/ItemList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Paper, Grid, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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

class ItemsDashboard extends Component {
  render() {
    const { items, auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography variant="h6">Items</Typography>
              <IconButton color="primary" component={Link} to="/items/create">
                <AddCircleIcon />
              </IconButton>
              <ItemList items={items} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
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
