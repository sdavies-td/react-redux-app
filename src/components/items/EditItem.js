import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { editItem } from "../../store/actions/itemActions";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import Loader from "../utils/Loader";

import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class EditItem extends Component {
  state = {
    itemId: null,
    itemName: null,
    itemPrice: 0,
    supplierName: null,
    itemLink: null,
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
          this.props.editItem(this.state);
          this.props.history.push("/items");
        }
      );
    } else {
      this.props.editItem(this.state);
      this.props.history.push("/items");
    }
  };
  render() {
    const { auth, classes, items, id } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (items) {
      const item = items.find((item) => item.id === id);
      const { itemName, supplierName, itemLink, itemPrice } = item;
      if (this.state.itemPrice === 0) {
        this.setState({
          itemPrice,
        });
      }
      if (this.state.itemId === null) {
        this.setState({
          itemId: id,
        });
      }
      if (this.state.itemName === null) {
        this.setState({
          itemName,
        });
      }
      if (this.state.supplierName === null) {
        this.setState({
          supplierName,
        });
      }
      if (this.state.itemLink === null) {
        this.setState({
          itemLink,
        });
      }

      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>
              Edit Item: {itemName}
            </Typography>
          </Grid>
          <Grid className={classes.body}>
            <Paper className={classes.paper}>
              <form noValidate onSubmit={this.handleSubmit}>
                <Grid className={classes.item}>
                  <TextField
                    id="itemName"
                    label="Item Name"
                    type="text"
                    fullWidth
                    onChange={this.handleChange}
                    required
                    defaultValue={itemName}
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
                    defaultValue={supplierName}
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
                      defaultValue={itemPrice}
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
                    defaultValue={itemLink}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid className={classes.button}>
                  <Grid className={classes.buttonRow}>
                    <Button
                      onClick={this.handleCancel}
                      variant="outlined"
                      color="secondary"
                      component={Link}
                      to="/items"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid className={classes.buttonRow}>
                    <Button type="submit" variant="outlined" color="primary">
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
  //const id = ownProps.match.params.id;
  const items = state.firestore.ordered.items;
  return {
    auth: state.firebase.auth,
    items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editItem: (item) => dispatch(editItem(item)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(EditItem);
