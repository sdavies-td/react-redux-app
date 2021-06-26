export const createOrder = (order) => {
  return (dispatch, getState, { getFirebase }) => {
    const db = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const createdById = getState().firebase.auth.uid;
    const createdBy = profile.firstName + " " + profile.lastName;
    const ordersRef = db.collection("orders");
    const orderCount = ordersRef.doc("--stats--");

    // const pad = (num, size) => {
    //   var s = "000000" + num;
    //   return s.substr(s.length - size);
    // };

    db.collection("orders")
      .add({
        ...order,
        createdByName: createdBy,
        createdById: createdById,
        createdAt: new Date(),
        status: "Created",
        orderCount: null,
      })
      .then((docRef) => {
        const orderRef = ordersRef.doc(docRef.id);
        orderCount.get().then((doc) => {
          const pad = (num, size) => {
            var s = "000000" + num;
            return s.substr(s.length - size);
          };
          const batch = db.batch();
          const count = doc.data().orderCount + 1;
          const converted = pad(count, 6);
          const concat = "#INV-CS".concat(converted);
          batch.set(orderCount, { orderCount: count }, { merge: true });
          batch.update(orderRef, {
            orderCount: concat,
          });
          batch.commit();
        });
        dispatch({ type: "CREATE_ORDER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_ORDER_ERROR" }, err);
      });
  };
};

export const editOrder = (order) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const editedById = getState().firebase.auth.uid;
    const editedBy = profile.firstName + " " + profile.lastName;
    const docRef = firestore.collection("orders").doc(order.orderId);
    const { orderId, ...rest } = order;
    docRef
      .update({
        ...rest,
        editedLastByName: editedBy,
        editedLastById: editedById,
        editedLastAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "EDIT_ORDER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "EDIT_ORDER_ERROR" }, err);
      });
  };
};
