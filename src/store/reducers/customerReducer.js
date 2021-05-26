import { toast } from "react-toastify";

const customerReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_CUSTOMER_ERROR": {
      toast.error("Customer error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "CREATE_CUSTOMER_SUCCESS": {
      toast.success("Customer created", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};

export default customerReducer;
