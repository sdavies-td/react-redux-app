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
        dispatch({ type: "CREATE_STORE_ERROR" }, err);
      });
  };
};

export const editStore = (store) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const editedById = getState().firebase.auth.uid;
    const editedBy = profile.firstName + " " + profile.lastName;
    const docRef = firestore.collection("stores").doc(store.storeId);
    const { storeId, ...rest } = store;
    docRef
      .update({
        ...rest,
        editedLastByName: editedBy,
        editedLastById: editedById,
        editedLastAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "EDIT_STORE_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "EDIT_STORE_ERROR" }, err);
      });
  };
};

export const deleteStore = (id) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const docRef = firestore.collection("stores").doc(id);
    docRef
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_STORE_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_STORE_ERROR" }, err);
      });
  };
};
