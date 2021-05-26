import { toast } from "react-toastify";

const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_ITEM_ERROR": {
      toast.error("Item error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "CREATE_ITEM_SUCCESS": {
      toast.success("Item created", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};

export default itemReducer;
