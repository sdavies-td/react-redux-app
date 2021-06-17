export const createItem = (state) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;

    const createdById = getState().firebase.auth.uid;
    const createdBy = profile.firstName + " " + profile.lastName;
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
        console.log(err);
        dispatch({ type: "CREATE_ITEM_ERROR" }, err);
      });
  };
};

export const editItem = (item) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const editedById = getState().firebase.auth.uid;
    const editedBy = profile.firstName + " " + profile.lastName;
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
