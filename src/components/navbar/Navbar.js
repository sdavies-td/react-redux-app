import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Grid } from "@material-ui/core";
import logo from "./logo.png";
import { themeStyles } from "../../theme";

const useStyles = makeStyles(themeStyles);

const Navbar = (props) => {
  const classes = useStyles();
  const { navbarRoot, navBarTitle, toolbar } = classes;
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks
      profile={profile}
      handleLoad={props.handleLoad}
      navLinks={props.navLinks}
    />
  ) : (
    <SignedOutLinks handleLoad={props.handleLoad} navLinks={props.navLinks} />
  );

  return (
    <AppBar className={navbarRoot}>
      <Grid className={toolbar}>
        <Link
          to={{
            pathname: "https://www.projectkitchens.co.nz/",
          }}
          target="_blank"
        >
          <Typography className={navBarTitle}>
            <img src={logo} alt="Project Kitchens" height={80} />
          </Typography>
        </Link>
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
