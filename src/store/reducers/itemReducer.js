import { toast } from "react-toastify";

export const itemReducer = (state = {}, action) => {
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

export const editItemReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_ITEM_ERROR": {
      toast.error("Edit item error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "EDIT_ITEM_SUCCESS": {
      toast.success("Item was edited", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};

export const deleteItemReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_ITEM_ERROR": {
      toast.error("Delete item error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "DELETE_ITEM_SUCCESS": {
      toast.success("Item was deleted", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};
