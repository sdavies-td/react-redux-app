export const createItem = (state) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const createdById = getState().firebase.auth.uid;
    const createdBy = getState().firebase.auth.displayName;
    const parentDocRef = firestore.collection("items").doc();
    parentDocRef
      .set({
        ...state,
        createdByName: createdBy,
        createdById: createdById,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_ITEM_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_ITEM_ERROR" }, err);
      });
  };
};

export const editItem = (item) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const editedById = getState().firebase.auth.uid;
    const editedBy = getState().firebase.auth.displayName;
    const docRef = firestore.collection("items").doc(item.itemId);
    const { itemId, ...rest } = item;
    docRef
      .update({
        ...rest,
        editedLastByName: editedBy,
        editedLastById: editedById,
        editedLastAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "EDIT_ITEM_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "EDIT_ITEM_ERROR" }, err);
      });
  };
};

export const deleteItem = (id) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const docRef = firestore.collection("items").doc(id);
    docRef
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_ITEM_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_ITEM_ERROR" }, err);
      });
  };
};
