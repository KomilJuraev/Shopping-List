import React from "react";

function Edit(props) {

  function handleEdit() {
    if (props.checkedId === true) {
      props.setIsEditClicked(true);
      props.handleItemChange(false);
      props.handleQuantityChange(false);
      props.handleUnit(false);
      props.setEditErrorMsg("");
      props.handlePrice(false);
      props.handlePriceOption(false);
    } else {
      props.setEditErrorMsg("Item is not selected. Please select a radio button to edit.")
    }
    props.setAddErrorMsgItemInput("");
    props.setAddErrorMsgQuantity("");
  }

  return (
    <button className="edit-btn footer-btn" onClick={handleEdit}>Edit</button>
  );
}

export default Edit;