import React, { useState } from "react";

function OrderItems() {
  const [inputList, setInputList] = useState([
    {
      itemName: "",
      itemSupplier: "",
      itemQty: "",
    },
  ]);

  const handleListChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...inputList];

    list[index][name] = value;

    setInputList(list);
  };

  const handleAddInput = () => {
    setInputList([
      ...inputList,
      { itemName: "", itemSupplier: "", itemQty: "" },
    ]);
  };

  const handleRemoveInput = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  //console.log(JSON.stringify(inputList, null, 2));
  return (
    <div>
      <h5 className="center">Order Items</h5>

      {inputList.map((item, i) => {
        return (
          <div key={i} className="row">
            <div className="input-field col s3">
              <label htmlFor="itemName">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={item.itemName}
                onChange={(e) => handleListChange(e, i)}
              />
            </div>
            <div className="input-field col s3">
              <label htmlFor="itemSupplier">Supplier</label>
              <input
                type="text"
                name="itemSupplier"
                value={item.itemSupplier}
                onChange={(e) => handleListChange(e, i)}
              />
            </div>
            <div className="input-field col s2">
              <label htmlFor="itemQty">Quantity</label>
              <input
                type="text"
                name="itemQty"
                value={item.itemQty}
                onChange={(e) => handleListChange(e, i)}
              />
            </div>
            <div className="col s3">
              {inputList.length !== 1 && (
                <div
                  type="button"
                  value="Remove"
                  onClick={handleRemoveInput}
                  className="btn-floating btn-medium waves-effect waves-light
                  red"
                >
                  <i className="material-icons">remove</i>
                </div>
              )}
              {inputList.length - 1 === i && (
                <div
                  type="button"
                  value="Add"
                  onClick={handleAddInput}
                  className="btn-floating btn-medium waves-effect waves-light blue"
                >
                  <i className="material-icons">add</i>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderItems;
