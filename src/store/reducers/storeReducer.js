import { toast } from "react-toastify";

export const storeReducer = (state = {}, action) => {
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

export const editStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_STORE_ERROR": {
      toast.error("Edit store error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "EDIT_STORE_SUCCESS": {
      toast.success("Store was edited", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};

export const deleteStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_STORE_ERROR": {
      toast.error("Delete store error", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    case "DELETE_STORE_SUCCESS": {
      toast.success("Store was deleted", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;
    }
    default:
      return state;
  }
};
