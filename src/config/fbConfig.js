import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const fbConfig = {
  apiKey: "AIzaSyANQdv8k-lk8ls_-K9dFQJ6yHw6UIxD2Qg",
  authDomain: "pk-customer-orders.firebaseapp.com",
  projectId: "pk-customer-orders",
  storageBucket: "pk-customer-orders.appspot.com",
  messagingSenderId: "245193408999",
  appId: "1:245193408999:web:7e0ee95d944ef084e0bd42",
};

firebase.initializeApp(fbConfig);
firebase.firestore();

export default firebase;
