import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { themeStyles } from "../../theme";

const useStyles = makeStyles(themeStyles);

const SignedOutLinks = () => {
  const classes = useStyles();
  const { navLinksRow, navLinkItem } = classes;
  const [color, setColor] = React.useState({
    signIn: "primary",
    signUp: "default",
  });
  const [variant, setVariant] = React.useState({
    signIn: "contained",
    signUp: "outlined",
  });
  const handleButton = (e) => {
    const id = e.target.textContent.toLowerCase();
    switch (id) {
      case "sign in":
        setVariant({ signIn: "contained", signUp: "outlined" });
        setColor({ signIn: "primary", signUp: "default" });
        break;
      case "sign up":
        setVariant({ signUp: "contained", signIn: "outlined" });
        setColor({ signUp: "primary", signIn: "default" });
        break;
      default:
        break;
    }
  };
  return (
    <Grid className={navLinksRow}>
      <Grid className={navLinkItem}>
        <Button
          id="signIn"
          variant={variant.signIn}
          color={color.signIn}
          onClick={handleButton}
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
          onClick={handleButton}
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
