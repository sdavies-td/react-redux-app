export const createCustomer = (customer) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const createdById = getState().firebase.auth.uid;
    const createdBy = getState().firebase.auth.displayName;
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
    const editedById = getState().firebase.auth.uid;
    const editedBy = getState().firebase.auth.displayName;
    const docRef = firestore.collection("customers").doc(customer.customerId);
    const { customerId, ...rest } = customer;
    docRef
      .update({
        ...rest,
        editedLastByName: editedBy,
        editedLastById: editedById,
        editedLastAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "EDIT_CUSTOMER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "EDIT_CUSTOMER_ERROR" }, err);
      });
  };
};

export const deleteCustomer = (id) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const docRef = firestore.collection("customers").doc(id);
    docRef
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_CUSTOMER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_CUSTOMER_ERROR" }, err);
      });
  };
};
