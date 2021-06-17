import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createItem } from "../../store/actions/itemActions";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

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

class CreateItem extends Component {
  state = {
    itemName: "",
    itemPrice: null,
    supplierName: "",
    itemLink: "",
  };
  handleChange = (e) => {
    //console.log(e.target.type);
    const value = e.target.value;
    if (e.target.type === "number") {
      this.setState({
        [e.target.id]: parseFloat(value).toFixed(2),
      });
    } else {
      this.setState({
        [e.target.id]: value,
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createItem(this.state);
    this.props.history.push("/items");
  };
  render() {
    const { auth, classes } = this.props;
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    return (
      <Grid className={classes.root}>
        <Grid className={classes.header}>
          <Typography className={classes.title}>Create an Item</Typography>
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
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="supplierName"
                  label="Supplier Name"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="itemPrice"
                  label="Item Price"
                  type="number"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.item}>
                <TextField
                  id="itemLink"
                  label="Link to Item"
                  type="text"
                  fullWidth
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
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </Grid>
    );
  }
}

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
