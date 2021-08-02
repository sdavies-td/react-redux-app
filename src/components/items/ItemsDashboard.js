import React, { Component } from "react";
import ItemList from "./ItemList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteItem } from "../../store/actions/itemActions";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Loader from "../utils/Loader";
import { themeStyles } from "../../theme";

const styles = (theme) => themeStyles;

class ItemsDashboard extends Component {
  handleDelete(id) {
    this.props.deleteItem(id);
  }
  render() {
    const { items, classes } = this.props;
    if (items) {
      return (
        <Grid className={classes.root}>
          <Grid className={classes.header}>
            <Typography className={classes.title}>Order Items</Typography>
            <IconButton color="primary" component={Link} to="/items/create">
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid className={classes.body}>
            <ItemList
              items={items}
              handleDelete={this.handleDelete.bind(this)}
              classes={classes}
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
    items: state.firestore.ordered.items,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (id) => dispatch(deleteItem(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "items" }]),
  withStyles(styles, { withTheme: true })
)(ItemsDashboard);
