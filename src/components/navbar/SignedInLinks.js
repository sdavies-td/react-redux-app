import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const SignedInLinks = (props) => {
  return (
    <React.Fragment>
      <Button variant="outlined" component={Link} to="/orders">
        Orders
      </Button>
      <Button variant="outlined" component={Link} to="/items">
        Items
      </Button>
      <Button variant="outlined" component={Link} to="/customers">
        Customers
      </Button>
      <Button variant="outlined" component={Link} to="/stores">
        Stores
      </Button>
      <Button
        variant="outlined"
        component={Link}
        to="/auth/signin"
        onClick={props.signOut}
      >
        Sign Out
      </Button>
      <IconButton variant="outlined" component={Link} to="/profile">
        <AccountCircleIcon>{props.profile.initials}</AccountCircleIcon>
      </IconButton>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
