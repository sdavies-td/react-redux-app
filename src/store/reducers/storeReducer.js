import { toast } from "react-toastify";

const storeReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_STORE_ERROR": {
      toast.error("Store error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "CREATE_STORE_SUCCESS": {
      toast.success("Store created", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};

export default storeReducer;
