import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const SignedOutLinks = (props) => {
  const { classes } = props;
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
    <Grid className={classes.navLinksRow}>
      <Grid className={classes.navLinkItem}>
        <Button
          variant={variant.signIn}
          color={color.signIn}
          onClick={handleButton}
          component={Link}
          to="/auth/signin"
        >
          Sign In
        </Button>
      </Grid>
      <Grid className={classes.navLinkItem}>
        <Button
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
