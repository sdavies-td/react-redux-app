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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const SignedInLinks = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [color, setColor] = React.useState({
    orders: "primary",
    items: "default",
    customers: "default",
    stores: "default",
    profile: "default",
  });
  const [variant, setVariant] = React.useState({
    orders: "contained",
    items: "outlined",
    customers: "outlined",
    stores: "outlined",
    profile: "outlined",
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { classes, profile } = props;
  const { firstName, lastName } = profile;
  const handleButton = (e) => {
    const id = e.target.textContent.toLowerCase();
    switch (id) {
      case "orders":
        setColor({
          orders: "primary",
          items: "default",
          customers: "default",
          stores: "default",
          profile: "default",
        });
        setVariant({
          orders: "contained",
          items: "outlined",
          customers: "outlined",
          stores: "outlined",
          profile: "outlined",
        });
        break;
      case "items":
        setColor({
          orders: "default",
          items: "primary",
          customers: "default",
          stores: "default",
          profile: "default",
        });
        setVariant({
          orders: "outlined",
          items: "contained",
          customers: "outlined",
          stores: "outlined",
          profile: "outlined",
        });
        break;
      case "customers":
        setColor({
          orders: "default",
          items: "default",
          customers: "primary",
          stores: "default",
          profile: "default",
        });
        setVariant({
          orders: "outlined",
          items: "outlined",
          customers: "contained",
          stores: "outlined",
          profile: "outlined",
        });
        break;
      case "stores":
        setColor({
          orders: "default",
          items: "default",
          customers: "default",
          stores: "primary",
          profile: "default",
        });
        setVariant({
          orders: "outlined",
          items: "outlined",
          customers: "outlined",
          stores: "contained",
          profile: "outlined",
        });
        break;
      case "profile":
        setColor({
          orders: "default",
          items: "default",
          customers: "default",
          stores: "default",
          profile: "primary",
        });
        setVariant({
          orders: "outlined",
          items: "outlined",
          customers: "outlined",
          stores: "outlined",
          profile: "contained",
        });
        break;
      default:
        break;
    }
  };

  return (
    <Grid className={classes.navLinksRow}>
      <Grid className={classes.navLinkItem}>
        <Button
          id="orders"
          variant={variant.orders}
          color={color.orders}
          component={Link}
          onClick={handleButton}
          to="/orders"
        >
          Orders
        </Button>
      </Grid>
      <Grid className={classes.navLinkItem}>
        <Button
          id="items"
          variant={variant.items}
          color={color.items}
          component={Link}
          to="/items"
          onClick={handleButton}
        >
          Items
        </Button>
      </Grid>
      <Grid className={classes.navLinkItem}>
        <Button
          id="customers"
          variant={variant.customers}
          color={color.customers}
          component={Link}
          to="/customers"
          onClick={handleButton}
        >
          Customers
        </Button>
      </Grid>
      <Grid className={classes.navLinkItem}>
        <Button
          id="stores"
          variant={variant.stores}
          color={color.stores}
          component={Link}
          to="/stores"
          onClick={handleButton}
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
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Typography>{firstName + " " + lastName}</Typography>
        </MenuItem>
        <MenuItem
          id="profile"
          onClick={(e) => {
            handleClose(e);
            handleButton(e);
          }}
          component={Link}
          to="/profile"
        >
          Profile
        </MenuItem>
        <MenuItem onClick={props.signOut} component={Link} to="/auth/signin">
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
