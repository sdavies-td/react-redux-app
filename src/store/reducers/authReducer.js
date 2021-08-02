import { toast } from "react-toastify";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGNIN_ERROR": {
      toast.error("Error signing in", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "SIGNIN_SUCCESS": {
      toast.success("Sign in success", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "SIGNOUT_SUCCESS": {
      toast.success("Sign out success", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "SIGNOUT_ERROR": {
      toast.error("Sign out error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};

export default authReducer;
