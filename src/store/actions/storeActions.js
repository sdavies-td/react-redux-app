export const createStore = (store) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const createdById = getState().firebase.auth.uid;
    const createdBy = profile.firstName + " " + profile.lastName;
    firestore
      .collection("stores")
      .add({
        ...store,
        createdByName: createdBy,
        createdById: createdById,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_STORE_SUCCESS" });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "CREATE_STORE_ERROR" }, err);
      });
  };
};
