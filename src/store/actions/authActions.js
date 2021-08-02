export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNOUT_ERROR" });
      });
  };
};

export const signInWithGoogle = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
      //hd: "projectkitchens.co.nz",
    });
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(() => {
        dispatch({ type: "SIGNIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNIN_ERROR" });
      });
  };
};
