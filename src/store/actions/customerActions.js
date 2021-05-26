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
