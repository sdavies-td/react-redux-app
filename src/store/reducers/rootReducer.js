import { combineReducers } from "redux";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
import customerReducer from "./customerReducer";
import storeReducer from "./storeReducer";
import itemReducer from "./itemReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  customer: customerReducer,
  store: storeReducer,
  item: itemReducer,
});

export default rootReducer;
