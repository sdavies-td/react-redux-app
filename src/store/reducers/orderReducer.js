import { toast } from "react-toastify";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_ORDER_SUCCESS": {
      toast.success("Order created", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "CREATE_ORDER_ERROR": {
      toast.error("Order error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};

export const editOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_ITEM_ERROR": {
      toast.error("Edit order error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "EDIT_ITEM_SUCCESS": {
      toast.success("Order edited", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};

export default orderReducer;
