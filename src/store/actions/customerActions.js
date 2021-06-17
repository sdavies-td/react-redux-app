export const createCustomer = (customer) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const createdById = getState().firebase.auth.uid;
    const createdBy = profile.firstName + " " + profile.lastName;
    firestore
      .collection("customers")
      .add({
        ...customer,
        createdByName: createdBy,
        createdById: createdById,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_CUSTOMER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_CUSTOMER_ERROR" }, err);
      });
  };
};

export const editCustomer = (customer) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const editedById = getState().firebase.auth.uid;
    const editedBy = profile.firstName + " " + profile.lastName;
    firestore
      .collection("customers")
      .add({
        ...customer,
        editedByName: editedBy,
        editedLastById: editedById,
        editedAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "EDIT_CUSTOMER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "EDIT_CUSTOMER_ERROR" }, err);
      });
  };
};
