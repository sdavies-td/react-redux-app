import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { orderReducer, editOrderReducer } from "./orderReducer";
import customerReducer from "./customerReducer";
import storeReducer from "./storeReducer";
import { itemReducer, editItemReducer } from "./itemReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  editOrder: editOrderReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  customer: customerReducer,
  store: storeReducer,
  item: itemReducer,
  editItem: editItemReducer,
});

export default rootReducer;
