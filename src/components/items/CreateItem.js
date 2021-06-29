import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createItem } from "../../store/actions/itemActions";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class CreateItem extends Component {
  state = {
    itemName: "",
    itemPrice: 0,
    supplierName: "",
    itemLink: "",
    gstExclusive: false,
  };
  handleChange = (e) => {
    const value = e.target.value;
    if (e.target.type === "number") {
      this.setState({
        itemPrice: Math.round(value * 100) / 100,
      });
    } else {
      this.setState({
        [e.target.id]: value,
      });
    }
  };
  handleSwitch = (e, value) => {
    if (value) {
      this.setState({
        gstExclusive: value,
        itemPrice:
          Math.round(
            (this.state.itemPrice - (this.state.itemPrice * 3) / 23) * 100
          ) / 100,
      });
    } else {
      this.setState({
        gstExclusive: value,
        itemPrice: Math.round(this.state.itemPrice * 1.15 * 100) / 100,
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.gstExclusive) {
      this.setState(
        {
          itemPrice: Math.round(this.state.itemPrice * 1.15 * 100) / 100,
        },
        () => {
          this.props.createItem(this.state);
          this.props.history.push("/items");
        }
      );
    } else {
      this.props.createItem(this.state);
      this.props.history.push("/items");
    }
  };
  render() {
    const { auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <Grid className={classes.root}>
        <Grid className={classes.header}>
          <Typography className={classes.title}>Create an Item</Typography>
        </Grid>
        <Grid className={classes.body}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit}>
              <Grid className={classes.item}>
                <TextField
                  id="itemName"
                  label="Item Name"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="supplierName"
                  label="Supplier Name"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <FormControlLabel
                control={
                  <Switch
                    defaultValue={this.state.gstExclusive}
                    onChange={this.handleSwitch}
                    name="gstSwitch"
                    color="primary"
                  />
                }
                label="Toggle GST Exclusive"
              />
              <Grid className={classes.item}>
                {!this.state.gstExclusive && (
                  <TextField
                    id="itemPriceIncl"
                    label="Item Price (GST Inclusive)"
                    type="number"
                    fullWidth
                    defaultValue={this.state.itemPrice}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    onChange={this.handleChange}
                    required
                  />
                )}
                {this.state.gstExclusive && (
                  <TextField
                    id="itemPriceExcl"
                    label="Item Price (GST Exclusive)"
                    type="number"
                    fullWidth
                    defaultValue={this.state.itemPrice}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    onChange={this.handleChange}
                    required
                  />
                )}
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="itemLink"
                  label="URL Link to Item"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid className={classes.buttonRow}>
                <Grid className={classes.buttonItem}>
                  <Button
                    onClick={this.handleCancel}
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    to="/items"
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

//<pre>{JSON.stringify(this.state, null, 2)}</pre>

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    items: state.firestore.ordered.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createItem: (item) => dispatch(createItem(item)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(CreateItem);
