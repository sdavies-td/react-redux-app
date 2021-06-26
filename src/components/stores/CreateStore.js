import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStore } from "../../store/actions/storeActions";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import Places from "../utils/Places";
import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class CreateStore extends Component {
  state = {
    name: "",
    address: "",
    bank: "",
    gst: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleAddress = (e) => {
    if (e) {
      this.setState({
        address: e.description,
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createStore(this.state);
    this.props.history.push("/stores");
  };
  render() {
    const { auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <Grid className={classes.root}>
        <Grid className={classes.header}>
          <Typography className={classes.title}>Create a Store</Typography>
        </Grid>
        <Grid className={classes.body}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit} className="white">
              <Grid className={classes.item}>
                <TextField
                  id="name"
                  label="Store Name"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.placesItem}>
                <Places handleAddress={this.handleAddress} />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="bank"
                  label="Bank Account"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="gst"
                  label="GST Number"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
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
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

//

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    stores: state.firestore.ordered.stores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createStore: (store) => dispatch(createStore(store)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(CreateStore);
