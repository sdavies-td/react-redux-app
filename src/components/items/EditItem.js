import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { editItem } from "../../store/actions/itemActions";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
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
    padding: theme.spacing(2),
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "Medium",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    width: "400px",
  },
  button: {
    marginTop: "40px",
    justifyContent: "center",
    display: "flex",
  },
  buttonRow: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  item: {
    marginTop: "20px",
    marginBottom: "20px",
  },
});

class EditItem extends Component {
  state = {
    itemId: "",
    itemName: "",
    itemPrice: "",
    supplierName: "",
    itemLink: "",
  };
  handleChange = (e) => {
    const value = e.target.value;
    if (e.target.type === "number") {
      this.setState({
        [e.target.id]: parseFloat(value),
      });
    } else {
      this.setState({
        [e.target.id]: value,
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editItem(this.state);
    this.props.history.push("/items");
  };

  render() {
    const { auth, classes, items, id } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (items) {
      const item = items.find((item) => item.id === id);
      const { itemName, supplierName, itemLink, itemPrice } = item;
      if (this.state.itemId === "") {
        this.setState({
          itemId: id,
        });
      }
      if (this.state.itemName === "") {
        this.setState({
          itemName,
        });
      }
      if (this.state.supplierName === "") {
        this.setState({
          supplierName,
        });
      }
      if (this.state.itemLink === "") {
        this.setState({
          itemLink,
        });
      }
      if (this.state.itemPrice === "") {
        this.setState({
          itemPrice,
        });
      }
      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>
              Edit Item {itemName}
            </Typography>
          </Grid>
          <Grid container className={classes.body}>
            <Paper className={classes.paper}>
              <form
                noValidate
                onSubmit={this.handleSubmit}
                className={classes.container}
              >
                <Grid className={classes.item}>
                  <TextField
                    id="itemName"
                    label="Item Name"
                    type="text"
                    fullWidth
                    defaultValue={itemName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <TextField
                    id="supplierName"
                    label="Supplier Name"
                    type="text"
                    fullWidth
                    defaultValue={supplierName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <TextField
                    id="itemPrice"
                    label="Item Price"
                    type="number"
                    fullWidth
                    defaultValue={itemPrice}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid className={classes.item}>
                  <TextField
                    id="itemLink"
                    label="Link to Item"
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
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </Grid>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const items = state.firestore.ordered.items;
  //console.log(items);
  //why are we not recieving items when going to route from the address bar instead?
  return {
    auth: state.firebase.auth,
    items,
    id,
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
