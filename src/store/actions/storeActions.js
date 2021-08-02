export const createStore = (store) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const createdById = getState().firebase.auth.uid;
    const createdBy = getState().firebase.auth.displayName;
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
    const editedById = getState().firebase.auth.uid;
    const editedBy = getState().firebase.auth.displayName;
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
