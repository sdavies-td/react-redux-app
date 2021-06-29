import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { editStore } from "../../store/actions/storeActions";
import { withStyles } from "@material-ui/core/styles";
import Places from "../utils/Places";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import Loader from "../utils/Loader";

import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class EditStore extends Component {
  state = {
    storeId: null,
    name: null,
    address: null,
    bank: null,
    gst: null,
  };
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.id]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editStore(this.state);
    this.props.history.push("/stores");
  };
  handleAddress = (e) => {
    if (e) {
      this.setState({
        address: e.description,
      });
    }
  };
  render() {
    const { auth, classes, stores, id } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (stores) {
      const store = stores.find((store) => store.id === id);
      const { name, address, bank, gst } = store;
      if (this.state.storeId === null) {
        this.setState({
          storeId: id,
        });
      }
      if (this.state.name === null) {
        this.setState({
          name,
        });
      }
      if (this.state.address === null) {
        this.setState({
          address,
        });
      }
      if (this.state.bank === null) {
        this.setState({
          bank,
        });
      }
      if (this.state.gst === null) {
        this.setState({
          gst,
        });
      }
      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>
              Edit Store: {name}
            </Typography>
          </Grid>
          <Grid className={classes.body}>
            <Paper className={classes.paper}>
              <form onSubmit={this.handleSubmit}>
                <Grid className={classes.item}>
                  <TextField
                    id="name"
                    label="Store Name"
                    type="text"
                    fullWidth
                    onChange={this.handleChange}
                    required
                    defaultValue={name}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <Places
                    defaultValue={address}
                    handleAddress={this.handleAddress}
                    required
                  />
                </Grid>
                <Grid className={classes.item}>
                  <TextField
                    id="bank"
                    label="Bank Account"
                    type="text"
                    fullWidth
                    onChange={this.handleChange}
                    required
                    defaultValue={bank}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <TextField
                    id="gst"
                    label="GST Number"
                    type="text"
                    fullWidth
                    onChange={this.handleChange}
                    required
                    defaultValue={gst}
                  />
                </Grid>
                <Grid className={classes.buttonRow}>
                  <Grid className={classes.buttonItem}>
                    <Button
                      onClick={this.handleCancel}
                      variant="outlined"
                      color="secondary"
                      component={Link}
                      to="/stores"
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid className={classes.buttonItem}>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      fullWidth
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      );
    } else {
      return <Loader />;
    }
  }
}
// <pre>{JSON.stringify(this.state, null, 2)}</pre>

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const stores = state.firestore.ordered.stores;
  return {
    auth: state.firebase.auth,
    stores,
    id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editStore: (store) => dispatch(editStore(store)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(EditStore);
