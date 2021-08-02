import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import {
  Button,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { themeStyles } from "../../theme";

const useStyles = makeStyles(themeStyles);

const SignedInLinks = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const { auth, state, handleLoad } = props;
  const { variant, color } = state;
  const { navLinksRow, navLinkItem } = classes;

  return (
    <Grid item className={navLinksRow}>
      <Grid className={navLinkItem}>
        <Button
          id="orders"
          variant={variant.orders}
          color={color.orders}
          component={Link}
          to="/orders"
          onClick={handleLoad}
        >
          Orders
        </Button>
      </Grid>
      <Grid className={navLinkItem}>
        <Button
          id="items"
          variant={variant.items}
          color={color.items}
          component={Link}
          to="/items"
          onClick={handleLoad}
        >
          Items
        </Button>
      </Grid>
      <Grid className={navLinkItem}>
        <Button
          id="customers"
          variant={variant.customers}
          color={color.customers}
          component={Link}
          to="/customers"
          onClick={handleLoad}
        >
          Customers
        </Button>
      </Grid>
      <Grid className={navLinkItem}>
        <Button
          id="stores"
          variant={variant.stores}
          color={color.stores}
          component={Link}
          to="/stores"
          onClick={handleLoad}
        >
          Stores
        </Button>
      </Grid>
      <IconButton
        id="profile"
        variant={variant.profile}
        color={color.profile}
        onClick={handleClick}
      >
        <Avatar src={auth.photoURL} />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          id="profile"
          onClick={(e) => {
            handleClose(e);
            handleLoad(e);
          }}
          component={Link}
          to="/profile"
        >
          <Typography>{auth.displayName}</Typography>
        </MenuItem>
        <MenuItem
          id="signOut"
          onClick={(e) => {
            props.signOut(e);
            handleLoad(e);
          }}
          component={Link}
          to="/auth"
        >
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
