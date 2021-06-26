import React, { Component } from "react";
import StoreList from "./StoreList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteStore } from "../../store/actions/storeActions";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Loader from "../utils/Loader";

import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class StoresDashboard extends Component {
  handleDelete(id) {
    this.props.deleteStore(id);
  }

  render() {
    const { stores, auth, classes } = this.props;

    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (stores) {
      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>Stores</Typography>
            <IconButton color="primary" component={Link} to="/stores/create">
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid className={classes.body}>
            <StoreList
              stores={stores}
              handleDelete={this.handleDelete.bind(this)}
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
    stores: state.firestore.ordered.stores,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStore: (id) => dispatch(deleteStore(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "stores" }]),
  withStyles(styles, { withTheme: true })
)(StoresDashboard);
