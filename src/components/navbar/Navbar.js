import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import logo from "./logo.png";
import { themeStyles } from "../../theme";

const useStyles = makeStyles(themeStyles);

const Navbar = (props) => {
  const classes = useStyles();
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} classes={classes} />
  ) : (
    <SignedOutLinks classes={classes} />
  );

  return (
    <AppBar className={classes.navbarRoot}>
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Link
              to={{
                pathname: "https://www.projectkitchens.co.nz/",
              }}
              target="_blank"
            >
              <Typography className={classes.navBarTitle}>
                <img src={logo} alt="Project Kitchens" height={80} />
              </Typography>
            </Link>
          </Grid>
          <Grid>{links}</Grid>
        </Grid>
      </Toolbar>
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
