import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <Button component={Link} to="/auth/signin">
        Sign In
      </Button>
      <Button component={Link} to="/auth/signup">
        Sign Up
      </Button>
    </React.Fragment>
  );
};

export default SignedOutLinks;
