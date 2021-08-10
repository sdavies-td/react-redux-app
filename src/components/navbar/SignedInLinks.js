import React, { useState, useEffect } from "react";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const { auth } = props;
  const { navLinksRow, navLinkItem } = classes;
  const initialVariant = {
    orders: "outlined",
    items: "outlined",
    customers: "outlined",
    stores: "outlined",
    profile: "outlined",
  };
  const initialColor = {
    orders: "default",
    items: "default",
    customers: "default",
    stores: "default",
    profile: "default",
  };
  const [variant, setVariant] = useState(initialVariant);
  const [color, setColor] = useState(initialColor);
  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    var tempVariant = initialVariant;
    delete tempVariant[path];
    var tempColor = initialColor;
    delete tempColor[path];
    setColor({ ...tempColor, [path]: "primary" });
    setVariant({ ...tempVariant, [path]: "contained" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setButtonStyle = (e) => {
    const path = e.target.innerHTML;
    if (path === auth.displayName) {
      setColor(initialColor);
      setVariant(initialVariant);
    } else {
      var tempVariant = initialVariant;
      delete tempVariant[path];
      var tempColor = initialColor;
      delete tempColor[path];
      setColor({ ...tempColor, [path]: "primary" });
      setVariant({ ...tempVariant, [path]: "contained" });
    }
  };
  return (
    <Grid item className={navLinksRow}>
      <Grid className={navLinkItem}>
        <Button
          id="orders"
          variant={variant.orders}
          color={color.orders}
          component={Link}
          to="/orders"
          onClick={(e) => {
            setButtonStyle(e);
          }}
        >
          orders
        </Button>
      </Grid>
      <Grid className={navLinkItem}>
        <Button
          id="items"
          variant={variant.items}
          color={color.items}
          component={Link}
          to="/items"
          onClick={(e) => {
            setButtonStyle(e);
          }}
        >
          items
        </Button>
      </Grid>
      <Grid className={navLinkItem}>
        <Button
          id="customers"
          variant={variant.customers}
          color={color.customers}
          component={Link}
          to="/customers"
          onClick={(e) => {
            setButtonStyle(e);
          }}
        >
          customers
        </Button>
      </Grid>
      <Grid className={navLinkItem}>
        <Button
          id="stores"
          variant={variant.stores}
          color={color.stores}
          component={Link}
          to="/stores"
          onClick={(e) => {
            setButtonStyle(e);
          }}
        >
          stores
        </Button>
      </Grid>
      <IconButton id="profile" onClick={handleClick}>
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
          variant={variant.profile}
          color={color.profile}
          onClick={(e) => {
            handleClose(e);
            setButtonStyle(e);
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
            window.location.href = "/";
          }}
        >
          Log Out
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
