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

// export const archiveItemReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "ARCHIVE_ITEM_ERROR": {
//       toast.error("Archive item error", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//       });
//       return state;
//     }
//     case "ARCHIVE_ITEM_ERROR_ITEM_SUCCESS": {
//       toast.success("Item has been archived", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//       });
//       return state;
//     }
//     default:
//       return state;
//   }
// };
