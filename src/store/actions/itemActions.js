export const createItem = (state) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(state);
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const createdById = getState().firebase.auth.uid;
    const createdBy = profile.firstName + " " + profile.lastName;
    const parentDocRef = firestore.collection("items").doc();
    const subCollectionDocRef = parentDocRef.collection("suppliers").doc();
    parentDocRef
      .set({
        name: state.itemName,
        createdByName: createdBy,
        createdById: createdById,
        createdAt: new Date(),
      })
      .then(() => {
        subCollectionDocRef.set({
          ...state.supplierInfo,
          supplierName: state.supplierName,
          createdByName: createdBy,
          createdById: createdById,
          createdAt: new Date(),
        });
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
