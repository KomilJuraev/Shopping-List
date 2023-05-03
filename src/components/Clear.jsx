import React from "react";
import { removePage } from "./RemovePage";

function Clear(props) {

  function handleClear() {
    if (props.checkedId === true) {
      let tempItemList = [...props.itemListRow];
      if (tempItemList.length > 1) {
        tempItemList.splice(props.clickedRowId - 1, 1);
        props.setItemListRow(tempItemList);
      } else {
        removePage(props);
      }
      if (props.clickedRowId !== undefined) {
        const checkbox = document.getElementById("item-checkbox-" + props.clickedRowId);
        checkbox.checked = false;
        props.setEditErrorMsg("");
      }
    } else {
      props.setEditErrorMsg("Item is not selected. Please select a radio button to remove.");
    }
    props.setAddErrorMsgItemInput("");
    props.setAddErrorMsgQuantity("");
    props.setCheckedId(false);
    props.setClickedRowId();
  }

  return (
    <button className="clear-btn footer-btn" onClick={handleClear}>Clear</button>
  );
}

export default Clear;