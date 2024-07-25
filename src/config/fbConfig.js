import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const fbConfig = {
  apiKey: "SET_API_KEY",
  authDomain: "SET_AUTH_DOMAIN",
  projectId: "SET_PROJECT_ID",
  storageBucket: "SET_STORAGE_BUCKET",
  messagingSenderId: "SET_MESSAGE_SENDER_ID",
  appId: "SET_APP_ID",
};

firebase.initializeApp(fbConfig);
firebase.firestore();

export default firebase;
