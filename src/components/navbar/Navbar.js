import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";

import { themeStyles } from "../../theme";

const useStyles = makeStyles(themeStyles);

const Navbar = (props) => {
  const classes = useStyles();
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
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
            <Typography variant="h6" className={classes.navBarTitle}>
              Project Kitchens
            </Typography>
          </Grid>
          <Grid item></Grid>
          <Grid item>{links}</Grid>
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
