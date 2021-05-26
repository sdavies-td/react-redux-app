import { toast } from "react-toastify";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_ERROR": {
      toast.error("Login error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "LOGIN_SUCCESS": {
      toast.success("Login success", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "SIGNOUT_SUCCESS": {
      toast.success("Signout success", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "SIGNOUT_ERROR": {
      toast.error("Signout error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "SIGNUP_SUCCESS": {
      toast.success("Signup success", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "SIGNUP_ERROR": {
      toast.error("Signup error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};

export default authReducer;
