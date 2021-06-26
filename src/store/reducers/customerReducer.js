import { toast } from "react-toastify";

export const customerReducer = (state = {}, action) => {
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

export const editCustomerReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_CUSTOMER_ERROR": {
      toast.error("Edit customer error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "EDIT_CUSTOMER_SUCCESS": {
      toast.success("Customer was edited", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};
