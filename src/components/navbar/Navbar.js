import React from "react";
import { NavLink } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Grid } from "@material-ui/core";
import logo from "./logo.png";
import { themeStyles } from "../../theme";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(themeStyles);

const Navbar = (props) => {
  const classes = useStyles();
  const { navbarRoot, navBarTitle, toolbar } = classes;
  const { auth, state, handleLoad, location } = props;
  const links = auth.uid ? (
    <SignedInLinks
      auth={auth}
      handleLoad={handleLoad}
      state={state}
      location={location}
    />
  ) : (
    <SignedOutLinks handleLoad={handleLoad} state={state} location={location} />
  );
  const path = window.location.pathname.split("/")[1];
  if (auth.uid && path === "auth") {
    return <Redirect to="/orders" />;
  }
  if (!auth.uid && path !== "auth") {
    return <Redirect to="/auth" />;
  }
  return (
    <AppBar className={navbarRoot}>
      <Grid className={toolbar}>
        <NavLink
          to={{
            pathname: "https://www.projectkitchens.co.nz/",
          }}
          target="_blank"
        >
          <Typography className={navBarTitle}>
            <img src={logo} alt="Project Kitchens" height={80} />
          </Typography>
        </NavLink>
        {links}
      </Grid>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
