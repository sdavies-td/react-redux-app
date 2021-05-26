export const createOrder = (order) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const createdById = getState().firebase.auth.uid;
    const createdBy = profile.firstName + " " + profile.lastName;
    firestore
      .collection("orders")
      .add({
        ...order,
        createdByName: createdBy,
        createdById: createdById,
        createdAt: new Date(),
        status: "created",
      })
      .then(() => {
        dispatch({ type: "CREATE_ORDER_SUCCESS" });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "CREATE_ORDER_ERROR" }, err);
      });
  };
};
