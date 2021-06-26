import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { themeStyles } from "../../theme";

const useStyles = makeStyles(themeStyles);

const SignedOutLinks = (props) => {
  const classes = useStyles();
  const { navLinksRow, navLinkItem } = classes;
  const { state, handleLoad } = props;
  const { variant, color } = state;
  return (
    <Grid className={navLinksRow}>
      <Grid className={navLinkItem}>
        <Button
          id="signIn"
          variant={variant.signIn}
          color={color.signIn}
          onClick={handleLoad}
          component={Link}
          to="/auth/signin"
        >
          Sign In
        </Button>
      </Grid>
      <Grid className={navLinkItem}>
        <Button
          id="signUp"
          variant={variant.signUp}
          color={color.signUp}
          onClick={handleLoad}
          component={Link}
          to="/auth/signup"
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignedOutLinks;
